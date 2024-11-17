# Vitest Unit Testing Demo for Login Workflow

## Description

This repository demonstrates unit testing practices for a login workflow using **Vitest** and **React Testing Library**. It includes a fully functional login page with validation, custom components, and tests that cover:

- UI rendering
- Form validation
- Authentication flow
- Integration of a custom reusable button component

The purpose of this repository is to showcase effective unit testing techniques and how to simulate user interactions and application behaviors in a React environment.

---

## Key Features

1. **Login Page**:
   - Built with Ant Design components.
   - Includes form validation for email and password fields.
   - Mocked authentication service for simulating login behavior.

2. **Custom Button Component**:
   - Reusable wrapper around the Ant Design button with extended props for flexibility.
   - Fully tested for rendering, prop behavior, and user interactions.

3. **Comprehensive Tests**:
   - UI verification tests (e.g., presence of input fields, buttons).
   - Validation tests (e.g., required fields, invalid email formats).
   - Authentication flow tests (e.g., handling success and failure cases).
   - Custom component behavior tests (e.g., button disabling).

4. **Mocking with Vitest**:
   - Demonstrates how to mock API calls and simulate different application states.

---

## Tech Stack

- **React**: Frontend framework.
- **Vitest**: Blazing-fast testing library.
- **React Testing Library**: For DOM testing and user interaction simulation.
- **Ant Design**: Component library for UI elements.

---

## Setup and Run

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation Steps

1. **Clone the Repository**:
   Clone this repository to your local machine using the following command:
   ```bash
   git clone https://github.com/ShanManage/unit-test-with-vitest.git
   cd unit-test-with-vitest


2. **Install Dependencies:**:
   Install the necessary dependencies using:
   ```bash
   npm install

3. **Run the Application:**:
   Start the development server to view the application:
   ```bash
   npm run dev

4. **Run the Tests:**:
   Execute the test suite to verify the functionality:
   ```bash
   npm run test