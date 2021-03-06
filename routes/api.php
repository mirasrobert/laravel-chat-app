<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/register', [RegisterController::class, 'register']);

Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::apiResource('messages', MessageController::class);

});

// Get User
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


