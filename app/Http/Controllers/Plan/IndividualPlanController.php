<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndividualPlanController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::latest()->get();
        $user = $request->user();
        return Inertia::render('Components/Individual/CustomCalendar',[
            'tasks' => $tasks,
            'loggedInUser' => $user,
        ]);
    }
}
