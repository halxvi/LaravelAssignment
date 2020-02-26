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
    Route::get('/top', 'MainController@index');
    Route::get('/top/reserve', 'MainController@reserve');
    Route::get('/top/delete', 'MainController@delete');
    Route::get('/top/pagenate', 'MainController@pagenate');
    Route::get('/logout', 'MainController@logout');
});
