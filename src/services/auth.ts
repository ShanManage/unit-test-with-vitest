import { LoginFormFields } from "../interfaces";

const login = async ({password, username}: LoginFormFields) => {
  const validCredentials = {
    username: 'admin@example.com',
    password: 'Example@123',
  };

  const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  await simulateDelay(400);

  if (username === validCredentials.username && password === validCredentials.password) {
    return {
      status: 'success',
      message: 'Login successful!',
      userId: 123,
    };
  }

  await simulateDelay(400);
  throw new Error('Invalid email or password. Please try again.');
}

export const AuthService = {
  login
}