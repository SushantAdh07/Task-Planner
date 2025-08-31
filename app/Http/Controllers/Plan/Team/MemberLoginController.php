<?php

namespace App\Http\Controllers\Plan\Team;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MemberLoginController extends Controller
{
    public function indexMemberLogin()
    {
        return Inertia::render('Components/Team/Member/MemberLogin');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('member')->attempt($credentials)) {
            return redirect()->route('team.calendar');
        }

        return redirect('/plan/team')->withErrors([
            'email' => 'Invalid credentials',
        ]);
    }

    public function logout()
    {
        Auth::guard('member')->logout();
        return redirect('/member/login');
    }
}
