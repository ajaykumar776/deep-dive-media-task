# Task Management System - Frontend Documentation

## Task Dashboard

This documentation provides an overview of the frontend setup and usage for the Task Management System built with React. The application enables users to manage tasks effectively with features such as creating, editing, filtering, and deleting tasks.

## Dependencies

- **React**: `^18.2.0`  
  The core library for building the user interface.
- **Material-UI**: `^5.10.6`  
  For UI components and styling.
- **React Router**: `^6.10.0`  
  For handling routing and navigation.
- **Axios**: `^1.2.0`  
  For making HTTP requests.

## Table of Contents

- Installation
- Features
  - Authentication
  - Task Dashboard
  - Create Task
  - Edit Task
  - Delete Task
  - Filtering and Pagination
- Configuration
- Running the Application

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/deep-dive-media-task.git
    ```

2. **Navigate to the Frontend Directory**
    ```bash
    cd deep-dive-media-task/frontend
    ```

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Start the Development Server**
    ```bash
    npm start
    ```

   The application will be available at `http://localhost:3000`.

### Features

- **Task Dashboard**: View all tasks with options to add, edit, and delete tasks.
- **Create Task**: Form for adding new tasks with title, status, and due date.
- **Edit Task**: Modify existing tasks, including changing status and due date.
- **Delete Task**: Remove tasks from the list.
- **Filtering and Pagination**:
  - Filter tasks by title, status, and due date.
  - Paginate through tasks to view a subset at a time.

### Configuration

1. **Set Up the API Base URL**
    - Open `src/api/apiService.js`.
    - Set the `API_BASE_URL` to point to your backend server:
      ```js
      const API_BASE_URL = 'http://localhost:8000/api';
      ```

### Running the Application

1. **Start the Development Server**
    ```bash
    npm start
    ```

   The frontend application will run at `http://localhost:3000`.
