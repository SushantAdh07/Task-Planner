<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TaskController;
use Inertia\Inertia;


 Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/welcome', function(){
    return Inertia::render('Components/Welcome/WelcomePage');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function(){
    Route::get('/home', [TaskController::class, 'index'])->name('index');
    Route::post('/tasks', [TaskController::class, 'createTask']);
    Route::put('/update-tasks/{task}', [TaskController::class, 'editTask']);
    Route::delete('/delete-task/{id}', [TaskController::class, 'deleteTask'])->name('task.delete');

    Route::post('/tasks/{task}/comments', [CommentsController::class, 'createComments'])->name('create.comment');
    Route::delete('/delete/comments/{comment}', [CommentsController::class, 'deleteComment'])->name('comment.delete');

});


require __DIR__.'/auth.php';
