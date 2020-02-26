<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class UserAuth extends Authenticatable
{
    use Notifiable, HasApiTokens;
    protected $fillable = ['email', 'password'];
    protected $primaryKey = 'userid';
    protected $table = 'users';
}
