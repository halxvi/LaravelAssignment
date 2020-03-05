<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class User extends Model
{
    protected static function boot()
    {
        parent::boot();

        // Create&Save時に自動でidをインサート
        self::creating(function ($model) {
            if (empty($model->userid)) {
                $model->userid = Uuid::generate()->string; // UUIDを作成、挿入
            }
        });

        self::saving(function ($model) {
            if (empty($model->userid)) {
                $model->userid = Uuid::generate()->string; // UUIDを作成、挿入
            }
        });
    }
}
