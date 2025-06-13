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

    protected function loggedInUser(){
        if(Auth::guard('member')->check()){
            return Auth::guard('member')->user();
        }

        return Auth::user();
    }


    protected function getCurrentTeam()
    {
        return $this->loggedInUser()->team;
    }

    public function showTeam()
    {
        $team = $this->getCurrentTeam()->with(['members' => function ($query){
            $query->where('status', 'registered');
        }, 'tasks.member'])->first();

        $loggedInUser = $this->loggedInUser()->id;        

        return Inertia::render('Components/Team/TeamMain', [
            'team' => $team,
            'tasks' => $team->tasks,
            'members' => $team->members,
            'loggedInUser' => $loggedInUser,
            'isCreator' => !Auth::guard('member')->check()
        ]);
    }
    
    public function showMemberTasks($memberId)
    {
        $team = $this->getCurrentTeam();
        $member = $team->members()->findOrFail($memberId);
        
        return Inertia::render('Components/Team/TeamMain', [
            'member' => $member,
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