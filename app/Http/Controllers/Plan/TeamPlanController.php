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

    protected function loggedInUser()
    {
        return Auth::guard('member')->user();
    }


    public function getCurrentTeam()
    {
        return $this->loggedInUser()->team;
    }

    public function showTeam()
    {

        $team = $this->getCurrentTeam();

        $team->load([
            'members' => fn($q) => $q->where('status', 'registered'),
            'tasks.member'
        ]);

        $loggedInUser = $this->loggedInUser();

        $loggedInMember = $team->members->firstWhere('user_id', $loggedInUser->id);

        return Inertia::render('Components/Team/TeamMain', [
            'team' => $team,
            'tasks' => $team->tasks,
            'members' => $team->members,
            'auth' => [
                'user' => $loggedInUser,
                'memberId' => optional($loggedInUser)->id,
            ],
            'isCreator' => !Auth::guard('member')->check(),
            'selectedUserId' => optional($loggedInMember)->id,
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

    public function newTeam()
    {
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
            'password' => Auth::user()->password,
            'role' => 'creator',
            'status' => 'registered',
        ]);

        return redirect()->route('team.calendar');
    }
}
