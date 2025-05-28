<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeamPlanRequest;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeamPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $teams = $user->teams()->with('members')->get(); 

        switch ($teams->count()) {
            case 0:
                return Inertia::render('Components/Plans/CreateTeam', [
                    'auth' => ['user' => $user]
                ]);

            case 1:
                $team = $teams->first();
                return Inertia::render('Components/Team/TeamMain', [
                    'auth' => ['user' => $user],
                    'team' => $team,
                    'members' => $team->members 
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
        $user = Auth::user();

        if ($user->teams()->exists()) {
        return back()->withErrors([
            'team' => 'You can only create one team'
        ]);
    }
        Team::create($request->validated());
        return redirect()->route('index');
    }

    public function teamCalendar(){
        
    }
}
