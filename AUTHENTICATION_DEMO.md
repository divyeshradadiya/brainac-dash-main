# Brainac Authentication Demo

This demo includes a complete login/signup/logout flow for the Brainac dashboard application.

## Demo Credentials

### Existing Users (for Login)
You can use these credentials to test the login functionality:

1. **Alex Johnson**
   - Email: `alex@student.school.edu`
   - Password: `password123`

2. **Sarah Smith**
   - Email: `sarah@student.school.edu`
   - Password: `password123`

### New User Registration
You can create a new account using any email that's not already in the system.

## Features

### 🔐 Authentication Flow
- **Login Form**: Email/password authentication with validation
- **Signup Form**: New user registration with form validation
- **Protected Routes**: All dashboard pages require authentication
- **Session Persistence**: Login state persists across browser sessions
- **Logout**: Secure logout with session cleanup

### 🎨 UI/UX Features
- **Subjects Theme**: Consistent styling with the rest of the application
- **Loading States**: Smooth loading animations during authentication
- **Error Handling**: User-friendly error messages and validation
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Full dark mode compatibility

### 🔒 Security Features
- **Form Validation**: Client-side validation for all inputs
- **Password Visibility Toggle**: Show/hide password functionality
- **Session Management**: Automatic session restoration
- **Route Protection**: Redirects to login for unauthenticated users

## How to Test

1. **Start the Application**
   ```bash
   npm run dev
   ```

2. **Test Login**
   - Navigate to any dashboard page
   - You'll be redirected to the login form
   - Use one of the demo credentials above
   - Click "Sign In" to authenticate

3. **Test Signup**
   - On the login page, click "Sign up"
   - Fill in the registration form
   - Use a new email address
   - Complete the registration

4. **Test Logout**
   - Once logged in, click the "Logout" button in the sidebar
   - You'll be redirected back to the login form

5. **Test Session Persistence**
   - Login with valid credentials
   - Refresh the page or close/reopen the browser
   - You should remain logged in

## Demo Data

The authentication system includes demo user data for testing:

```javascript
const demoUsers = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@student.school.edu',
    password: 'password123',
    avatar: 'https://github.com/shadcn.png'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah@student.school.edu',
    password: 'password123',
    avatar: 'https://github.com/shadcn.png'
  }
];
```

## Technical Implementation

### Components
- `AuthPage`: Main authentication page with form switching
- `LoginForm`: Login form with validation
- `SignupForm`: Registration form with validation
- `ProtectedRoute`: Route protection wrapper
- `AuthContext`: Authentication state management

### Context & State Management
- `AuthProvider`: Provides authentication context
- `useAuth`: Hook for accessing auth functionality
- Local storage for session persistence

### Styling
- Consistent with the subjects theme
- Glass morphism effects
- Gradient backgrounds and animations
- Responsive design patterns

## Notes

- This is a demo implementation using localStorage for session management
- In a production environment, you would integrate with a real backend API
- The authentication is client-side only for demonstration purposes
- All user data is stored locally and will be cleared when the browser cache is cleared
