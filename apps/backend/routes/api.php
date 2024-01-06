<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get("/login", function(){
    return response()->json(
        [
            "message" => "please auth first.....",
            "status" => false
        ], 500
    );
});

Route::group([
    "prefix" => "v1",
    "middleware" => ["cors"]
], function(){
    Route::prefix("user")->group(function(){
        Route::post("auth", [App\Http\Controllers\ReadController::class, "authenticateUser"]);
        Route::post("create", [App\Http\Controllers\CreateController::class, "createUser"]);
    });
});


Route::group([
    "prefix" => "v1",
    "middleware" => ["cors", 'auth:sanctum']
], function(){
    Route::group(
        ["middleware" => []
    ], function(){
        Route::prefix("classroom")->group(function(){
            Route::get("/", [\App\Http\Controllers\ReadController::class, "getAllClassroom"]);
        });

        Route::prefix("attandence")->group(function(){
            Route::get("/records", [\App\Http\Controllers\ReadController::class, "getAllAttadenceRecords"]);
        });

        Route::prefix("excel")->group(function(){
            Route::get("/attandence", [App\Http\Controllers\ReadController::class, "exportExcelStudentAttandence"]);
        });

        Route::prefix("students")->group(function(){
            Route::get("/", [\App\Http\Controllers\ReadController::class, "getAllStudentData"]);
        });
    });
});