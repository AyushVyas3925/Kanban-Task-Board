# Development Journey & AI Collaboration

This document captures the iterative process of building the **Kanban Task Board**. It reflects the key technical questions, debugging sessions, and optimization requests I made while developing the application.

---

## 🏗️ Level 1: Core Logic & setup

**Goal**: Build the foundation using React and Vite.

### 1. Project Initialization
> "I'm setting up a new React project with Vite. What is the standard folder structure for a small app? I want to keep components separate."

### 2. State Management Strategy
> "I have a list of task objects in my state. How can I efficiently filter them into three separate arrays ('To Do', 'In Progress', 'Done') to render them in different columns?"

### 3. Implementing Deletion
> "My delete button isn't working as expected. I'm trying to remove an item by its ID. Is `filter` the best method to update the state immutably?"

### 4. Moving Tasks
> "I want to move a task from one column to another. How do I update a specific object's property (e.g., `status`) within an array of objects in React state?"

---

## 🎨 Level 2: Polish & User Experience

**Goal**: Enhance the UI and add interactivity.

### 5. Inline Editing Logic
> "I want to make the task text editable. How can I toggle an input field when the user clicks on the text, and save the changes back to the state on `blur` or `Enter` key press?"

### 6. Dynamic Styling with Tailwind
> "I have a `priority` prop on my TaskCard component (High, Medium, Low). How can I dynamically apply different border colors in Tailwind CSS based on this prop?"

### 7. Data Persistence
> "Every time I refresh, my tasks disappear. What is the best way to sync my React state with `localStorage` so the data persists?"


