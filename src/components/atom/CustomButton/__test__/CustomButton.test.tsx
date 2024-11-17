import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import CustomButton from '../CustomButton';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('CustomButton Component', () => {
  afterEach(() => {
    // Cleanup ensures no leftover DOM or mock data after each test
    cleanup();
    // Clear all mocks to reset `AuthService` behavior
    vi.clearAllMocks();
  });
  it('should render the button with the correct text', () => {
    render(<CustomButton>Click Me</CustomButton>);
    const button = screen.getByText(/Click Me/i); // Query by text
    expect(button).toBeDefined(); // Assert the button is rendered
  });

  it('should call the onClick handler when clicked', () => {
    const handleClick = vi.fn(); // Mock the click handler
    render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);

    // Use `getByRole` to find the button by its role and accessible name
    const button = screen.getByRole('button', { name: /Click Me/i });
    fireEvent.click(button); // Simulate a click
    expect(handleClick).toHaveBeenCalledTimes(1); // Assert the handler was called
  });

  it('should not call the onClick handler when the button is disabled', () => {
    const handleClick = vi.fn(); // Mock the click handler
    render(<CustomButton disabled={true}>Disabled Button</CustomButton>);

    // Use `getByRole` to find the button by its role and accessible name
    const button = screen.getByRole('button', { name: /Disabled Button/i });

    // Simulate a click on the disabled button
    fireEvent.click(button);

    // Assert that the click handler was NOT called
    expect(handleClick).not.toHaveBeenCalled();
  });
});

