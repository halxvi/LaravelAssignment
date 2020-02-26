<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\User;

class LoginController extends Controller
{
    public function index()
    {
        return view('login');
    }

    public function authenticate(LoginRequest $request)
    {
        $validatedRequest = $request->validated();
        $user = User::where('email', $validatedRequest->input('email'));
        Cookie::queue('key', $user['api_token'], 30);
        // if ($request->rememberMe) {
        //     $rememberFlag = true;
        // } else {
        //     $rememberFlag = false;
        // }

        // $validatedRequest = $request->validated();

        // if (Auth::attempt($validatedRequest, $rememberFlag)) {
        //     return redirect()->intended('main');
        // } else {
        //     return redirect()->intended('login');
        // }
    }
}
