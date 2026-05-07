# OOP in Java — Engineering Handbook (Modular Version)

This project has been refactored from a monolithic `oops.html` file into a modular, component-based structure using **Vite**.

## Structure
- `index.html`: The main entry point and shell (sidebar, navigation).
- `src/css/main.css`: Extracted styles.
- `src/js/app.js`: Application logic (navigation, search, scroll progress).
- `src/content/`: Individual HTML fragments for each section (e.g., `why-oop-exists.html`, `encapsulation.html`, `solid-principles.html`).

## Why This is Better
1. **Maintainability**: You can edit individual sections in their own small files rather than scrolling through 2700+ lines.
2. **Readability**: Section files are now named descriptively based on their topic (e.g., `solid-principles.html` instead of `s16.html`).
3. **Cleanliness**: CSS and JS are separated from the HTML, making the structure easier to understand.
4. **Performance**: Vite optimizes the build, minifying assets and bundling them efficiently.
5. **Modern Workflow**: You get Hot Module Replacement (HMR) during development.

## How to Use
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

## Key Components
- **Sidebar**: Defined in `index.html`.
- **Sections**: Loaded dynamically in `app.js` from the `src/content/` folder.
- **Interactive Elements**: QA blocks and scroll progress are handled in `app.js`.
