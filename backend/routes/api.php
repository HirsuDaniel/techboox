<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\CVController;
use App\Http\Controllers\CompanyController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);


Route::post('posts', [PostsController::class, 'store']);
Route::get('posts', [PostsController::class, 'index']);
Route::post('posts/{post}/like', [PostsController::class, 'like']);
Route::delete('posts/{post}/unlike', [PostsController::class, 'unlike']);
Route::get('tags', [PostsController::class, 'getAllTags']);
Route::post('tags', [PostsController::class, 'createTag']);

Route::prefix('posts')->group(function () {
    Route::post('/{post}/comments', [CommentsController::class, 'store']);
    Route::get('/{post}/comments', [CommentsController::class, 'getComments']);
});

Route::get('survey/questions', [SurveyController::class, 'getQuestions']);
Route::post('survey/responses', [SurveyController::class, 'submitResponses']);
Route::get('survey/status', [SurveyController::class, 'checkStatus']);
Route::get('posts/filter', [PostsController::class, 'filterPosts']);


Route::post('cvs', [CVController::class, 'store']);
Route::get('/cvs/{id}', [CVController::class, 'show']);


Route::middleware(['auth:api', 'super_admin'])->group(function () {
    Route::post('/admin/create-company', [CompanyController::class, 'store']);
});

Route::middleware('auth:api')->get('/companies', [CompanyController::class, 'index']);

Route::group([ 'middleware' => 'api'], function ($router) {
    Route::get('users', [AuthController::class, 'index']);
});

