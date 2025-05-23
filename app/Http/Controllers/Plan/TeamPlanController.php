<?php

namespace App\Http\Controllers\Plan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamPlanController extends Controller
{
    public function index(Request $request){

        $user = $request->user();
        return Inertia::render('Components/Plans/TeamPlan',[
            'auth' => ['user' => $user],
        ]);
    }
    
}
