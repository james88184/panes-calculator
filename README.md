# Simple Calculator (React + Tailwind CSS)

DCIT 26: Application Development and Emerging Technologies, Laboratory 1

A responsive calculator built with React (Vite) and Tailwind CSS.

## Features
- Display screen for input and results
- Number buttons (0-9), operators (+, −, ×, ÷), decimal, ±, %
- Clear (C) and equals (=) buttons
- Instructions / User Guide section
- React state (`useReducer`) and event handling for all buttons
- Keyboard support (digits, + - * /, Enter, Backspace, Esc)
- Error handling (division by zero)
- Press animation on buttons, responsive layout

## Run locally
```bash
npm install
npm run dev      # development server
npm test         # logic tests
npm run build    # production build in /dist
```

## Deploy (Vercel / Netlify / GitHub Pages)
1. Push this folder to a GitHub repository.
2. **Vercel**: Import the repo → Framework preset *Vite* → Deploy.
   **Netlify**: Build command `npm run build`, publish directory `dist`.
3. Submit the live URL, e.g. `https://project-name.vercel.app`.

## Project structure
```
src/
  App.jsx              main component, keyboard handling
  calculator.js        pure calculator logic (reducer)
  calculator.test.js   tests
  components/
    Display.jsx  Keypad.jsx  Button.jsx  Instructions.jsx
```
