<?php

namespace App\Http\Controllers\Plan\Team;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Team;
use Illuminate\Http\Request;
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

            Member::create([
                'team_id' => $team->id,
                'name'    => $validated['name'],
                'email'   => $validated['email'],
                'role'    => 'member',
            ]);

            return response()->json(['success' => true]); // Return JSON instead of redirect

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'errors' => $e->validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }
    }
}
