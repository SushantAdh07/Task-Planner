<?php

namespace App\Http\Controllers\Plan\Team;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberLoginController extends Controller
{
    public function indexMemberLogin(){
        return Inertia::render('Components/Team/Member/MemberLogin');
    }

    
}
