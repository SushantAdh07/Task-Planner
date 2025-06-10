<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeamPlanRequest;
use App\Models\Member;
use App\Models\TeamTasks;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TeamPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user->team) {
            return Inertia::render('Components/Plans/TeamPlan');
        }

        $team = $user->team()->with([
            'members' => fn($query) => $query->where('status', 'registered'),
            'tasks' => fn($query) => $query->with(['comments.member', 'member'])->latest()
        ])->first();

        return Inertia::render('Components/Team/TeamMain', [
            'auth' => ['user' => $user],
            'team' => $team,
            'members' => $team->members,
            'tasks' => $team->tasks, 
            'slug' => Str::slug($user->name),
        ]);
    }

    public function createTeam(TeamPlanRequest $request)
    {
        $user = Auth::user();

        if ($user->team()->exists()) {
            return back()->withErrors(['team' => 'You can only create one team']);
        }

        $team = Team::create($request->validated());

        Member::create([
            'team_id' => $team->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => 'creator',
            'status' => 'registered',
        ]);

        return redirect()->route('team.calendar');
    }
}
