<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\User;

class SignupController extends Controller
{
    public function index()
    {
        return view('/signup/signup');
    }

    public function confirm(Request $request)
    {
        $name = $request->name;
        $password = $request->password;
        $email =  $request->email;
        return view('/signup/confirm', compact('name', 'password', 'email'));
    }

    public function send(Request $request)
    {
        $user = new User();
        $user->userid = 0;
        $user->username = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->save();

        $cred = $request->only('email', 'password');
        if (Auth::attempt($cred)) {
            return redirect()->intended('main');
        } else {
            return redirect()->intended('login');
        }
    }
}
