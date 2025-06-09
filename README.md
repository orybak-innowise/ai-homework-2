# User Directory Application

A React application for managing users with search functionality, pagination, and modal windows. Built with React, Styled CSS


## Features

- **User List**: Display users in a structured list format
- **Search Functionality**: Search through users with SearchBar component
- **Pagination**: Navigate through user data with pagination controls
- **User Modal**: View detailed user information in modal windows
- **Responsive Design**: Modern UI built with Tailwind CSS
- **TypeScript Support**: Full TypeScript integration for type safety

## How to Run the Project

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-homework-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code linting

## Project Structure

```
src/
  components/
    UserList/
    SearchBar/
    Pagination/
    UserModal/
  styles/
  types.ts
  App.tsx
  main.jsx
```

## Technologies Used

- React 19.1.0
- TypeScript
- Vite (build tool)
- ESLint (code linting)
