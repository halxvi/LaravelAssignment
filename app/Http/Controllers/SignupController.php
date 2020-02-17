<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\User;

class SignupController extends Controller
{
    public function index()
    {
        return view('/signup/signup');
    }

    public function confirm(SignupRequest $request)
    {
        $validatedRequest = $request->validated();
        return view('/signup/confirm', $validatedRequest);
    }

    public function send(Request $request)
    {
        $user = new User();
        $user->userid = 0;
        $user->username = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->api_token = Str::random(80);
        $user->save();

        $cred = $request->only('email', 'password');
        if (Auth::attempt($cred)) {
            return redirect()->intended('main');
        } else {
            return redirect()->intended('login');
        }
    }

    public function back()
    {
        return redirect('signup');
    }
}
