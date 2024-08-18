<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->query();
        $page = $request->query('page', 1);
        $user = auth()->user();
        $query = Task::where('user_id', $user->id);
    
        if (isset($filters['title'])) {
            $query->where('title', 'like', '%' . $filters['title'] . '%');
        }
    
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }
    
        if (isset($filters['dueDate'])) {
            $query->whereDate('due_date', $filters['dueDate']);
        }
    
        $tasks = $query->paginate(10, ['id', 'title', 'description', 'status', 'due_date', 'priority'], 'page', $page);
    
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
    
        return response()->json([
            'tasks' => $formattedTasks,
            'current_page' => $tasks->currentPage(),
            'last_page' => $tasks->lastPage(),
            'total' => $tasks->total(),
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
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

    public function show($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        return response()->json($task);
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $validatedData = $request->getData();
        $task = Task::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $task->update($validatedData);
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $task->delete();

        return response()->json(null, 204);
    }
}
