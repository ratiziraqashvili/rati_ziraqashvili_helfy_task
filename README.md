# Task Manager App

## Backend Setup
1. cd backend
2. npm install
3. npm start (runs on port 4000)

## Frontend Setup
1. cd frontend
2. npm install
3. npm start (runs on port 3000)

## API Endpoints
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

## Design desicions
- Infinite Carousel Logic: I went with a "tripled-array" approach for the task list so users can scroll in either direction without hitting a dead end or seeing a weird jump. Felt like the cleanest way to keep the experience smooth.
- In-Place Editing: Instead of popping open a modal, edits happen right inside the carousel. That way you don't lose your scroll position mid-task, and the whole thing feels less interrupted.
- Data Validation: The form tracks input as you type and shows errors immediately — red border, error text, right there. Easier to catch mistakes before anything gets submitted.

## Time Spent
- Backend & API Logic (1 Hours): Setting up the Express server, wiring up the in-memory store, and writing the CRUD endpoints — GET, POST, PUT, DELETE, and PATCH.
- Frontend Core & State (2 Hours): Spinning up the React project, handling task state, and building out the service layer that talks to the local API.
- UI/UX & Carousel (3 Hours): Building the infinite scroll carousel, dropping in Lucide-React icons, and styling everything with custom CSS to get a clean, responsive look.
- Validation & Filtering (1 Hours): Adding real-time form validation, handling errors gracefully, and implementing the filter logic for sorting tasks by status.
