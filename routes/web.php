<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Individual\IndividualTaskController;
use App\Http\Controllers\Plan\IndividualPlanController;
use App\Http\Controllers\Plan\Team\AddMemberController;
use App\Http\Controllers\Plan\Team\AssignedTaskController;
use App\Http\Controllers\Plan\Team\MemberLoginController;
use App\Http\Controllers\Plan\TeamPlanController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\PlanMiddleware;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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
    return Inertia::render('Components/LandingPage');
})->name('home');

Route::get('/home', [HomeController::class, 'index'])->middleware('auth')->name('index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('plan')->group(function () {
    //Route::get('/home', [HomeController::class, 'index'])->name('index');
    Route::post('/team-tasks', [TaskController::class, 'createTask']);
    Route::put('/update-team-tasks/{id}', [TaskController::class, 'editTask']);
    Route::delete('/delete-team-task/{id}', [TaskController::class, 'deleteTask'])->name('teamtask.delete');

    Route::post('/tasks/{task}/comments', [CommentsController::class, 'createComments'])->name('create.comment');
    Route::delete('/delete/comments/{comment}', [CommentsController::class, 'deleteComment'])->name('comment.delete');
});



Route::prefix('plan')->group(function () {
    
    Route::controller(TeamPlanController::class)->group(function () {
        Route::get('/team', 'showTeam')->name('team.calendar')->middleware('plan');
        Route::get('/new/team', 'newTeam')->name('new.team');
        Route::post('/create/team', 'createTeam');
        Route::get('/assignments', 'showAssignments');  
    });

    Route::post('/create/assignments', [AssignedTaskController::class, 'createAssignments']);



    Route::controller(IndividualPlanController::class)->group(function () {
        Route::get('/{slug}', 'index')->name('indiviudal');
    });
    Route::post('/tasks', [IndividualTaskController::class, 'createTask']);
    Route::put('/update-tasks/{id}', [IndividualTaskController::class, 'editTask']);
    Route::delete('/delete-task/{id}', [IndividualTaskController::class, 'deleteTask'])->name('task.delete');



});

Route::controller(AddMemberController::class)->prefix('plan')->group(function(){
        Route::post('/add/member', 'addMember');
        Route::get('/create/profile/{member}', 'showRegistrationForm')->name('member.register.form');
        Route::put('/update/profile/{member}', 'updateProfile');
    });

Route::controller(MemberLoginController::class)->prefix('member')->group(function(){
    Route::get('/login', 'indexMemberLogin')->middleware('customGuest');
    Route::post('login', 'login')->name('member.login');
    Route::post('logout', 'logout')->name('member.logout');
});


Route::get('/test-mail', function () {
    Mail::raw('This is a test email from Laravel to Mailtrap.', function ($message) {
        $message->to('your@email.com') 
                ->subject('Test Mail');
    });

    return 'Mail sent!';
});

require __DIR__ . '/auth.php';
