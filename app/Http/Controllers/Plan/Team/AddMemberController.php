<?php

namespace App\Http\Controllers\Plan\Team;

use App\Http\Controllers\Controller;
use App\Mail\InviteMemberMail;
use App\Models\Member;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class AddMemberController extends Controller
{

    public function addMember(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:members,email',
            'name' => 'required|string|max:255',
        ]);

        $team = Team::where('user_id', auth()->id())->first();

        $member = Member::create([
            'team_id' => $team->id,
            'name'    => $validated['name'],
            'email'   => $validated['email'],
        ]);

        $inviteUrl = URL::temporarySignedRoute(
            'member.register.form',
            now()->addMinutes(60),
            ['member' => $member->id]
        );

        Mail::to($member->email)->send(new InviteMemberMail($inviteUrl));

        return back()->with('success', 'Invitation sent successfully!');
    }

    public function showRegistrationForm(Member $member)
    {
        abort_if($member->status !== 'invited', 403);
        return Inertia::render('Components/Team/CreateProfile', ['member' => $member]);
    }
    public function updateProfile(Request $request, $id)
    {
        $request->validate([
            'name' => "required|string|min:3|max:20",
            'password' => "required|min:8",
        ]);

        $member = Member::findOrFail($id);

        $member->update([
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'status' => 'registered',
        ]);

        return back();
    }

    
}
