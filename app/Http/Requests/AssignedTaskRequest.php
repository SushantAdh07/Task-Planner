<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignedTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id'=> ['required', 'exists:users,id'],
            'task_id'=> ['required', 'exists:tasks,id'],
            'team_id'=> ['required', 'exists:teams,id'],
            'assigned_task'=> ['required'],
            'due_date'=> ['required', 'date'],
            'priority'=> ['required', 'string', 'in:low,medium,high,critical'],
            
        ];
    }
}
