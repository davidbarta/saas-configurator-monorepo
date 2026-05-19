# Configurator: Vue to React Migration Showcase

This repository serves as a showcase of my frontend engineering skills and technical decision-making. It captures the process of migrating an existing application (a service configurator) from Vue 3 to the modern React ecosystem (Next.js).

The goal is not simply to translate syntax, but to demonstrate a deep understanding of the architectural differences between both frameworks while maintaining a 1:1 UI/UX and full testability.

## 🛠 Tech Stack & Tools

The repository is structured as a monorepo (using npm workspaces) to allow for an easy side-by-side comparison of both implementations.

* **Core:** TypeScript, Tailwind CSS, Vite / Next.js
* **Phase 1 (Vue):** Vue 3 (Composition API), Pinia, Vue Test Utils, vuedraggable
* **Phase 2 (React):** React 18, Next.js (App Router), Zustand, React Testing Library, @hello-pangea/dnd
* **Testing:** Vitest (including TDD practices and accessibility testing - a11y)

## 🧠 What to Look For (Architectural Decisions)

1.  **State Management (Pinia vs. Zustand):** I deliberately chose Zustand for the React implementation. Its immutable and functional approach closely mirrors the flexibility Pinia provides in Vue. I strongly emphasize separating business logic (price calculations, array mutations) from the presentation layer.

2.  **Testing Strategy (RTL & A11y):** In the React app, I utilize React Testing Library. I strictly avoid testing implementation details (like internal component state) and instead test the UI from the user's perspective, with a strong focus on accessibility (`getByRole`, `aria-label`). For critical logic (e.g., store mutations), I prefer a TDD approach.

3.  **Modern React Patterns:**
    * Strict adherence to the "Rules of Hooks".
    * Computing derived state directly within selectors to prevent unnecessary re-renders.
    * Clear separation between Server Components (for routing and layout) and Client Components (for interactivity).

4.  **Drag & Drop Implementation:** A practical demonstration of handling complex user interactions. While Vue handles this cleanly via `v-model` bindings, React requires manual, immutable array manipulation and state updates (implemented using `@hello-pangea/dnd`).

## 🚀 How to Run the Project

```bash
# 1. Install dependencies in the root (bootstraps all workspaces)
npm install

# 2. Start the original Vue application
npm run dev:vue
# the app will be accessible on http://localhost:3000/

# 3. Start the new React application (Next.js)
npm run dev:react
# the app will be accessible on http://localhost:5173/

# 4. Run test suites
npm run test
# or run specifically for React: npm run test:react
# or specifically for Vue: npm run test:vue
