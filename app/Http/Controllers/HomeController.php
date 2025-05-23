<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $slug = $user ? Str::slug($user->name) : null;

        return Inertia::render('Components/Welcome/WelcomePage', [
            'auth' => ['user' => $user],
            'slug' => $slug,
        ]);
    }

}
