<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Exception;
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
        try {
            $user = new User();
            $user->username = $request->name;
            $user->password = Hash::make($request->password);
            $user->email = $request->email;
            $user->api_token = Str::random(80);
            $user->save();
        } catch (Exception $e) {
            report($e);
            abort('500');
        }
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->input('email'));
            $userid = $user->get('userid');
            $api_token = $user->get('api_token');
            return [$userid, $api_token];
        } else {
            abort('422');
        }
    }

    public function back()
    {
        return redirect('signup');
    }
}
