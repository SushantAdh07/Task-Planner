<?php

namespace App\Http\Middleware;

use App\Models\Member;
use App\Models\Team;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PlanMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $member = Auth::guard('member')->user();
        $hasTeam = Member::where('id', $member->id)->exists();

        if (!$hasTeam){
            return redirect()->route('new.team');
        }
        
        return $next($request);
    }
}
