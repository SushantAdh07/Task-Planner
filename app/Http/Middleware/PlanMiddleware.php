<?php

namespace App\Http\Middleware;

use App\Models\Member;
use App\Models\Team;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\AuthTrait;

class PlanMiddleware
{
    use AuthTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::guard('member')->user() ?? Auth::user();
        $team = $this->getCurrentTeam();

        if (!$user) {
            return redirect()->route('login');
        }

        if ($user instanceof \App\Models\Member) {
            $hasTeam = !empty($user->team_id);
        }
        else {
            $hasTeam = Member::where('team_id', $team->id)->exists();
        }

        if (!$hasTeam) {
            return redirect()->route('new.team');
        }

        return $next($request);
    }
}
