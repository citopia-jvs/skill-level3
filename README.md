# Citopia Technical Test

## Project Overview

This project is a small React+TypeScript app created for the ***Citopia Technical Test***.  

### Main Features
- **Zustand** for state management with persistence.
- **Dynamic image generation** using the [DummyJSON API](https://dummyjson.com/docs/image).
- **Birthday countdown** based on user input.
- **Unit and integration tests** with Jest and React Testing Library.

### Project Structure
```
src/
 ├── components/
 ├── pages/
 │   ├── Home/         # Home page (DummyJSON image + birthday info)
 │   └── Informations/  # User info form
 ├── store/            # Zustand store for user data
 ├── utils/            # Utility functions
 └── main.tsx
```


## Getting Started

### Section 1: installation

1. **Clone the repo**
   ```bash
   git clone <url>
   cd <folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

4. **Build for production**
   ```bash
   npm run build
   ```
---

### Section 2:How to Run Tests

The project uses **Jest** and **React Testing Library**.

Run all tests:
```bash
npm run test
```

To run in watch mode:
```bash
npm run test:watch
```

---