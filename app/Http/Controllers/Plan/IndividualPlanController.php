<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IndividualPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }
        $tasks = $user->tasks;


        return Inertia::render('Components/Individual/IndividualMain', [
            'tasks' => $tasks,
            'user' => $user,
        ]);
    }
}
