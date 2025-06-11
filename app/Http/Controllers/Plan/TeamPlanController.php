<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeamPlanRequest;
use App\Models\Member;
use App\Models\Task;
use App\Models\Team;
use App\Models\TeamTasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TeamPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $team = $user->team()->with(['members' => function ($query) {
            $query->where('status', 'registered');
        }])->first();
        $tasks = TeamTasks::with(['comments.member'])->latest()->get();
        $slug = $user ? Str::slug($user->name) : null;
        return Inertia::render('Components/Team/TeamMain', [
                    'auth' => ['user' => $user],
                    'team' => $team,
                    'members' => $team->members,
                    'tasks' => $tasks,
                    'slug' => $slug,
                ]);

    }

    public function newTeam(){
        return Inertia::render('Components/Plans/TeamPlan');
    }


    public function createTeam(TeamPlanRequest $request)
    {
        $user = Auth::user();

        if ($user->team()->exists()) {
            return back()->withErrors([
                'team' => 'You can only create one team'
            ]);
        }
        $team = Team::create($request->validated());


        Member::create([
            'team_id' => $team->id,
            'name' => Auth::user()->name,
            'email' => Auth::user()->email,
            'role' => 'creator',
            'status' => 'registered',
        ]);

        return redirect()->route('team.calendar');
    }

}