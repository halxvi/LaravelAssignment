<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class SignupController extends Controller
{
    public function index()
    {
        return view('/signup/signup');
    }

    public function create(Request $request)
    {
        $name = $request->name;
        $password = $request->password;
        $email =  $request->email;
        return view('/signup/create', compact('name', 'password', 'email'));
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->userid = 0;
        $user->name = $request->name;
        $user->password = $request->password;
        $user->email = $request->email;
        $user->save();
        return redirect('/main');
    }
}
