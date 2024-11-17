/* eslint-disable @typescript-eslint/no-explicit-any */
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe, beforeAll, vi, beforeEach, afterEach } from 'vitest';
import Login from '../Login';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../../Dashboard';
import { AuthService } from '../../../services/auth';

// Mocking the AuthService module to simulate login API calls
vi.mock('../../../services/auth');

beforeAll(() => {
  // Mocking the `matchMedia` API to avoid issues in environments like JSDOM
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: any) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // `addListener` is deprecated, but we mock it for compatibility
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

describe('Login screen', () => {
  beforeEach(() => {
    // Rendering the `Login` component wrapped inside `MemoryRouter`
    // This simulates the routing behavior for navigation between pages
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Cleanup ensures no leftover DOM or mock data after each test
    cleanup();
    // Clear all mocks to reset `AuthService` behavior
    vi.clearAllMocks();
  });

  // Grouping tests related to the presence of UI elements
  describe('Visual Elements Verification', () => {
    it('should render the logo', () => {
      // Query the logo by its alt text using `getByAltText`
      // This mimics how screen readers identify images
      const logo = screen.getByAltText(/logo/i);
      expect(logo).toBeDefined(); // Assert that the logo is rendered
    });

    it('should render the application title', () => {
      // Find the application title by its visible text
      // `getByText` matches visible text in the DOM, case-insensitively
      const title = screen.getByText(/Vitest Environment/i);
      expect(title).toBeDefined(); // Assert that the title is rendered
    });

    it('should render the email input', () => {
      // Query the email input field using its placeholder text
      // `getByPlaceholderText` is useful for form inputs with placeholders
      const emailInput = screen.getByPlaceholderText(/Email Address/i);
      expect(emailInput).toBeDefined(); // Assert that the input is present
    });

    it('should render the password input', () => {
      // Use a test ID (`data-testid`) to query the password input
      // This is a custom attribute often added for testing
      const passwordInput = screen.getByTestId('password-field');
      expect(passwordInput).toBeDefined(); // Assert that the password input is present
    });

    it('should render the login button', () => {
      // Query the login button by its ARIA role
      // `getByRole` matches elements like buttons, links, etc., by their role
      const button = screen.getByRole('button', { name: /Login/i });
      expect(button).toBeDefined(); // Assert that the button is rendered
    });
  });

  // Grouping tests for form validation
  describe('Form Validation Checks', () => {
    it('should display error message when button is clicked without entering form field values', async () => {
      // Query the login button by its role and click it
      const button = screen.getByRole('button', { name: /Login/i });
      fireEvent.click(button); // Simulate a button click

      // Wait for the validation error messages to appear in the DOM
      await waitFor(() => {
        // Query the email field error message by its visible text
        const emailErrorMessage = screen.getByText(/Please enter your Email!/i);
        expect(emailErrorMessage).toBeDefined(); // Assert the error message is shown
      });

      await waitFor(() => {
        // Query the password field error message
        const passwordErrorMessage = screen.getByText(/Please enter your password!/i);
        expect(passwordErrorMessage).toBeDefined(); // Assert the error message is shown
      });
    });

    it('should display error message when button is clicked with an invalid email format', async () => {
      // Simulate typing an invalid email into the email input
      const emailInput = screen.getByPlaceholderText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'ishara' } });

      // Simulate typing a password
      const passwordInput = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'ishara' } });

      // Click the login button
      const button = screen.getByRole('button', { name: /Login/i });
      fireEvent.click(button);

      // Wait for the email validation error to appear
      await waitFor(() => {
        const emailErrorMessage = screen.getByText(/Please enter valid Email!/i);
        expect(emailErrorMessage).toBeDefined();
      });
    });
  });

  // Grouping tests for login functionality
  describe('Authentication Flow', () => {
    it('should display error alert for invalid credentials', async () => {
      // Mock the `AuthService.login` function to simulate a failed login attempt
      AuthService.login = vi.fn().mockRejectedValue(new Error('Invalid email or password'));

      // Simulate entering invalid email and password
      const emailInput = screen.getByPlaceholderText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'wronguser@gmail.com' } });

      const passwordInput = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

      // Click the login button
      const button = screen.getByRole('button', { name: /Login/i });
      fireEvent.click(button);

      // Wait for the error alert to appear
      await waitFor(() => {
        const alertMessage = screen.getByText(/Invalid email or password.!/i);
        expect(alertMessage).toBeDefined();
      });
    });

    it('should navigate to the dashboard screen with valid credentials', async () => {
      // Mock the `AuthService.login` function to simulate a successful login
      AuthService.login = vi.fn().mockResolvedValue({
        status: 'success',
        message: 'Login successful!',
        userId: 123,
      });

      // Simulate entering valid email and password
      const emailInput = screen.getByPlaceholderText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });

      const passwordInput = screen.getByPlaceholderText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: 'securePassword123' } });

      // Click the login button
      const button = screen.getByRole('button', { name: /Login/i });
      fireEvent.click(button);

      // Wait for navigation to the dashboard to complete
      await waitFor(() => {
        const dashboardText = screen.getByText(/Dashboard Screen/i);
        expect(dashboardText).toBeDefined(); // Verify successful navigation
      });
    });
  });
});
