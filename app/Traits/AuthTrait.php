<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;


trait AuthTrait
{
    protected function loggedInUser()
    {
        return Auth::guard('member')->user() ?? Auth::user();
    }

    public function getCurrentTeam()
    {
        $user = $this->loggedInUser();

        return $user?-> team ?? null;
    }
}
