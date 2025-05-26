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
        $teams = $user->teams()->with('members')->get(); // Eager load members

        switch ($teams->count()) {
            case 0:
                return Inertia::render('Components/Plans/CreateTeam', [
                    'auth' => ['user' => $user]
                ]);

            case 1:
                $team = $teams->first();
                return Inertia::render('Components/Team/TeamTest', [
                    'auth' => ['user' => $user],
                    'team' => $team,
                    'members' => $team->members // Access members from the team
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
