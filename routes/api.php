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

//Route::get('/signup', 'SignupController@index')->name('signup');
//Route::post('/login/authentication', 'LoginController@authenticate');

// Route::post('/signup/confirm', 'SignupController@confirm');
// Route::post('/signup/send', 'SignupController@send');
// Route::get('/signup/back', 'SignupController@back');


// Route::get('/main', 'MainController@index')->name('main');
Route::middleware(['auth:api', 'web'])->group(function () {
    Route::get('info', 'MainController@info');
});
// Route::get('/main/reserve', 'MainController@reserve');
// Route::get('/main/delete', 'MainController@delete');
// Route::get('/main/pagenate', 'MainController@pagenate');
// Route::get('/main/logout', 'MainController@logout');
