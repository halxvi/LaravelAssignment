<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return view('/login');
    }

    public function authenticate(Request $request)
    {
        $cred = $request->only('email', 'password');
        if ($request->rememberMe) {
            $rememberFlag = true;
        } else {
            $rememberFlag = false;
        }
        if (Auth::attempt($cred, $rememberFlag)) {
            return redirect()->intended('main');
        } else {
            return redirect()->intended('login');
        }
    }
}
