<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Plan\IndividualPlanController;
use App\Http\Controllers\Plan\Team\AddMemberController;
use App\Http\Controllers\Plan\TeamPlanController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\PlanMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;


/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

//    Route::get('/welcome', function (Request $request) {
//
//        $user = $request->user();
//
//        $slug = $user ? Str::slug($user->name) : null;
 //       
//
 //       return Inertia::render('Components/Welcome/WelcomePage', [
//            'auth' => ['user' => $user],
 //           'slug' => $slug,
//        ]);
 //   });

Route::get('/', function(){
    //
});

Route::get('/', [HomeController::class, 'index'])->middleware('auth')->name('index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    //Route::get('/home', [HomeController::class, 'index'])->name('index');
    Route::post('/tasks', [TaskController::class, 'createTask']);
    Route::put('/update-tasks/{task}', [TaskController::class, 'editTask']);
    Route::delete('/delete-task/{id}', [TaskController::class, 'deleteTask'])->name('task.delete');

    Route::post('/tasks/{task}/comments', [CommentsController::class, 'createComments'])->name('create.comment');
    Route::delete('/delete/comments/{comment}', [CommentsController::class, 'deleteComment'])->name('comment.delete');
});

//PlansRoutes

//    Route::get('/sushant', function(){
 //       return Inertia::render('Components/Individual/CustomCalendar');
 //   });


Route::middleware('auth')->prefix('plan')->group(function () {
    
    Route::controller(TeamPlanController::class)->group(function () {
        
            Route::get('/team', 'index')->name('team.calendar');
        
        Route::post('/create/team', 'createTeam');
        
    });
    

    Route::controller(AddMemberController::class)->group(function(){
        Route::post('/add/member', 'addMember');
        Route::get('/edit/profile/{id}', 'index');
        Route::put('/update/profile/{id}', 'updateProfile');
    });

    Route::controller(IndividualPlanController::class)->group(function () {
        Route::get('/{slug}', 'index')->name('indiviudal');
    });
});

require __DIR__ . '/auth.php';
