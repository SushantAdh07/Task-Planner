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
        try {
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

            return Inertia::render('Components/Team/TeamMain');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'errors' => $e->validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }
    }

    public function index()
    {
        return Inertia::render('Components/Team/CreateProfile');
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

        return redirect()->back();
    }
}
