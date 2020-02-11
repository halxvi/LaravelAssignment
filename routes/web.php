<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/login', 'LoginController@index')->name('login');
Route::post('/login/auth', 'LoginController@authenticate');
Route::get('/signup', 'SignupController@index')->name('signup');
Route::post('/signup/confirm', 'SignupController@confirm');
Route::post('/signup/send', 'SignupController@send');
Route::get('/signup/back', 'SignupController@back');
Route::get('/main', 'MainController@index')->name('main');
Route::get('/main/reserve', 'MainController@reserve');
Route::get('/main/delete', 'MainController@delete');
Route::get('/main/pagenate', 'MainController@pagenate');
Route::get('/main/logout', 'MainController@logout');
