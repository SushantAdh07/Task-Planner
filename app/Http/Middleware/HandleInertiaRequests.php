<?php

namespace App\Http\Middleware;

use App\Traits\AuthTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    use AuthTrait;


    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $currentGuard = null;
        $guards = array_keys(config('auth.guards', ['web']));
        
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $currentGuard = $guard;
                break;
            }
        }

        return [
            ...parent::share($request),
            'authUsers' => [
                'user' => $request->user(),
                'guard' => $currentGuard,
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'newComment' => fn() => $request->session()->get('newComment'),
                'deleteComment' => fn() => $request->session()->get('deleteComment'),
            ],
            'currentTeam_id' => $this->getCurrentTeam()?->id,
        ];
    }
}
