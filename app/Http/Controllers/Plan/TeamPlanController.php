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


    protected function getCurrentTeam()
    {
        if (Auth::guard('member')->check()) {
            
            return Auth::guard('member')->user()->team;
        }    
        
        return Auth::user()->team;
    }

    public function showTeam()
    {
        $team = $this->getCurrentTeam()->load(['members', 'tasks.member']);
        
        return Inertia::render('Components/Team/TeamMain', [
            'team' => $team,
            'isCreator' => !Auth::guard('member')->check()
        ]);
    }
    
    public function showMemberTasks($memberId)
    {
        $team = $this->getCurrentTeam();
        $member = $team->members()->findOrFail($memberId);
        
        return Inertia::render('Components/Team/TeamMain', [
            'members' => $member,
            'tasks' => $member->tasks,
            'team' => $team,
            'isCreator' => !Auth::guard('member')->check()
        ]);
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