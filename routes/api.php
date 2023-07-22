<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DeskController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('desks', DeskController::class);
Route::resource('categories', CategoryController::class);
Route::resource('tasks', TaskController::class);
Route::resource('tags', TagController::class);
