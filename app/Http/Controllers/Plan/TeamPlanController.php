<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeamPlanRequest;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $teams = $user->teams; // Using relationship as property for automatic loading

        switch ($teams->count()) {
            case 0:
                return Inertia::render('Components/Plans/CreateTeam', [
                    'auth' => ['user' => $user]
                ]);

            case 1:
                return Inertia::render('Components/Team/TeamTest', [
                    'auth' => ['user' => $user],
                    'team' => $teams->first()->load(['users', 'users.user'])
                ]);

            default:
                return Inertia::render('Components/Plans/TeamSelection', [
                    'auth' => ['user' => $user],
                    'teams' => $teams
                ]);
        }
    }

    public function createTeam(TeamPlanRequest $request)
    {
        Team::create($request->validated());
        return redirect()->route('index');
    }
}
