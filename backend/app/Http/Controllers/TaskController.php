<?php
// app/Http/Controllers/TaskController.php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Get all tasks for the authenticated user
    // TaskController.php
    // TaskController.php
    public function index(Request $request)
    {
        // Get all query parameters
        $filters = $request->query();
        
        // Get the current page number, defaulting to 1
        $page = $request->query('page', 1);
    
        // Get the logged-in user
        $user = auth()->user();
    
        // Start building the query
        $query = Task::where('user_id', $user->id); // Filter tasks by the logged-in user
    
        // Apply title filter if provided
        if (isset($filters['title'])) {
            $query->where('title', 'like', '%' . $filters['title'] . '%');
        }
    
        // Apply status filter if provided
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }
    
        // Apply due date filter if provided
        if (isset($filters['dueDate'])) {
            $query->whereDate('due_date', $filters['dueDate']);
        }
    
        // Paginate the results with a page size of 10
        $tasks = $query->paginate(10, ['id', 'title', 'description', 'status', 'due_date', 'priority'], 'page', $page);
    
        // Format the tasks for the response
        $formattedTasks = $tasks->map(function($task) {
            return [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status,
                'due_date' => $task->due_date,
                'priority' => $task->priority,
            ];
        });
    
        // Return the tasks in a JSON response with pagination metadata
        return response()->json([
            'tasks' => $formattedTasks,
            'current_page' => $tasks->currentPage(),
            'last_page' => $tasks->lastPage(),
            'total' => $tasks->total(),
        ]);
    }
    



    // Create a new task
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'dueDate' => 'nullable|date',
            'priority' => 'required|integer|min:1|max:5',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'due_date' => $request->dueDate,
            'priority' => $request->priority,
            'user_id' => Auth::id(),
        ]);

        return response()->json($task, 201);
    }

    // Get a single task
    public function show($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        return response()->json($task);
    }

    // Update an existing task
    public function update(UpdateTaskRequest $request, $id)
    {
        $validatedData = $request->getData();
        $task = Task::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $task->update($validatedData);
        return response()->json($task);
    }

    // Delete a task
    public function destroy($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $task->delete();

        return response()->json(null, 204);
    }
}
