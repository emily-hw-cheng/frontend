// Mock database of users
const mockUsers = [
  { email: 'admin@frosted.com', password: 'a1', role: 'admin' },
  { email: 'franchise1@frosted.com', password: 'f1', role: 'franchise', franchiseId: 1 },
  { email: 'franchise2@frosted.com', password: 'f2', role: 'franchise', franchiseId: 2 },
  { email: 'customer@frosted.com', password: 'c1', role: 'customer' },
];

// Simulate a delay to mimic a real backend API call
const simulateApiDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Login a user by verifying their credentials.
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} - The logged-in user's data.
 * @throws {Error} - If the credentials are invalid.
 */
export const loginUser = async ({ email, password }) => {
  await simulateApiDelay(200); // Simulate API delay

  const user = mockUsers.find((u) => u.email === email && u.password === password);

  console.log('Login attempt:', { email, password, user }); // Debugging log

  if (!user) {
    throw new Error('Invalid email or password');
  }

  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('userRole', user.role);
  if (user.role === 'franchise') {
    localStorage.setItem('franchiseId', user.franchiseId); // Save franchiseId for franchise users
  }

  return user;
};

/**
 * Register a new user.
 * @param {Object} userData - The user's registration data.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @param {string} userData.role - The user's role (e.g., admin, franchise, customer).
 * @returns {Promise<Object>} - The registered user's data.
 * @throws {Error} - If the email is already registered.
 */
export const registerUser = async ({ email, password, role }) => {
  await simulateApiDelay(500); // Simulate API delay

  const existingUser = mockUsers.find((u) => u.email === email);

  if (existingUser) {
    throw new Error('Email is already registered');
  }

  // Add the new user to the mock database
  const newUser = { email, password, role };
  mockUsers.push(newUser);

  // Simulate token and save user role in localStorage
  localStorage.setItem('token', 'mock-token');
  localStorage.setItem('userRole', role);

  return newUser;
};

/**
 * Logout the current user by clearing localStorage.
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};