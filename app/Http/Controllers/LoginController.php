<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return view('login');
    }

    public function authenticate(LoginRequest $request)
    {
        if ($request->rememberMe) {
            $rememberFlag = true;
        } else {
            $rememberFlag = false;
        }

        $validatedRequest = $request->validated();

        if (Auth::attempt($validatedRequest, $rememberFlag)) {
            return redirect()->intended('main');
        } else {
            return redirect()->intended('login');
        }
    }
}
