<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:api'])->group(function () {
    Route::post('/top', 'MainController@index');
    Route::post('/top/reserve', 'MainController@reserve');
    Route::post('/top/delete', 'MainController@delete');
    Route::post('/top/pagenate', 'MainController@pagenate');
});

Route::post('/login/auth', 'LoginController@authenticate');
Route::post('/signup/send', 'SignupController@send');
