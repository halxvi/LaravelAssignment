<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class UserAuth extends Authenticatable
{
    protected  $fillable = ['email', 'password'];
    protected $primaryKey = 'userid';
    protected $table = 'users';
}
