<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    // This method determines if the user is authorized to make this request
    public function authorize()
    {
        return true; // You can add your own logic here to authorize the request
    }

    // This method returns the validation rules that apply to the request
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'dueDate' => 'nullable|date',
            'priority' => 'required|integer|min:1|max:5',
        ];
    }

    // This method returns the custom attribute names (optional)
    public function attributes()
    {
        return [
            'dueDate' => 'due date', // Human-friendly name for dueDate field
        ];
    }

    // This method returns the custom validation messages (optional)
    public function messages()
    {
        return [
            'title.required' => 'The task title is required.',
            'status.required' => 'The task status is required.',
            'dueDate.date' => 'The due date must be a valid date.',
        ];
    }

    public function getData()
    {
        $validated = $this->validated();
        return [
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'status'      => $validated['status'],
            'due_date'    => $validated['dueDate'],  // Adjusted to match the form field name
            'priority'    => $validated['priority'],
            'user_id'     => $this->user()->id,      // Assuming you want to set the current user's ID
        ];
    }
}
