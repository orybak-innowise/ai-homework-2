# React Pricing Component with Dashboard

A modern React application showcasing responsive pricing cards and optimized performance using Web Workers.

## Features

### Pricing Section
- Responsive pricing cards layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- Featured card with elevated design and darker background
- Clean, modern UI with Tailwind CSS
- Smooth hover effects and transitions
- Keyboard accessibility with focus states
- No spacing between cards for seamless design

### Dashboard Component
- Heavy computation handled in Web Worker
- Non-blocking UI implementation
- Loading state during calculation
- Clean worker cleanup on unmount

## Technical Implementation

### Components
- `PricingCard`: Individual pricing card with TypeScript props
- `PricingSection`: Container component managing pricing cards layout
- `Dashboard`: Example of Web Worker implementation for performance optimization

### Performance Optimizations
- Web Worker for heavy computations
- Optimized Tailwind CSS classes
- Proper component organization
- Responsive design without performance impact

### Technologies Used
- React
- TypeScript
- Tailwind CSS
- Web Workers
- Vite

## Project Structure
```
src/
  components/
    Dashboard.tsx
    PricingCard.tsx
    PricingSection.tsx
  workers/
    computeWorker.ts
  App.jsx
  index.css
```

## Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
