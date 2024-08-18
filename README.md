# Mini Task Management System

## About This Project
This is a Mini Task Management System designed to manage tasks efficiently. Users can create, update, and delete tasks, and manage various aspects of their task lists.

## Table of Contents
- [Backend Documentation](#backend-documentation)
  - [About Backend](#about-backend)
  - [Installation](#backend-installation)
  - [Running the Backend](#running-the-backend)
- [Frontend Documentation](#frontend-documentation)
  - [About Frontend](#about-frontend)
  - [Installation](#frontend-installation)
  - [Features](#frontend-features)
  - [Configuration](#frontend-configuration)
  - [Running the Frontend](#running-the-frontend)

## Backend Documentation

### About Backend
The backend is built with Laravel and provides a RESTful API for managing tasks. It handles task creation, updating, deletion, and retrieval.

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/ajaykumar776/deep-dive-media-task.git
    ```

2. **Navigate to the Backend Directory**
    ```bash
    cd deep-dive-media-task/backend
    ```

3. **Install Dependencies**
    ```bash
    composer install
    ```

4. **Set Up Environment Variables**
    ```bash
    cp .env.example .env
    php artisan key:generate

    ```

6. **Run Migrations and Seed Database**
    ```bash
    php artisan migrate --seed
    ```

7. **Start the Laravel Development Server**
    ```bash
    php artisan serve
    ```

## Frontend Documentation

### About Frontend
The frontend is built with React and provides a user interface for managing tasks. Features include task creation, editing, filtering, and deletion.

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

### Running the Frontend

1. **Start the Development Server**
    ```bash
    npm start
    ```

   The frontend application will run at `http://localhost:3000`.
