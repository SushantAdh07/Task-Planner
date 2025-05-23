<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class IndividualPlanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Make sure $user is not null
        if ($user) {
            $slug = Str::slug($user->name);
            $individualPlanUrl = route('plan.show', ['slug' => $slug]);
        } else {
            $individualPlanUrl = route('login'); // fallback
        }

        return Inertia::render('WelcomePage', [
            'auth' => ['user' => $user],
            'individualPlanUrl' => $individualPlanUrl,
        ]);
    }
}
