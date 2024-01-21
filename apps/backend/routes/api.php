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
    "middleware" => []
], function(){
    Route::prefix("user")->group(function(){
        Route::post("auth", [App\Http\Controllers\ReadController::class, "authenticateUser"]);
        Route::post("create", [App\Http\Controllers\CreateController::class, "createUser"]);
    });

    Route::prefix("excel")->group(function(){
        Route::get("/attandence", [App\Http\Controllers\ReadController::class, "exportExcelStudentAttandence"]);
    });

    // Route::post("/test", [\App\Http\Controllers\CreateController::class, "test"]);
});


Route::group([
    "prefix" => "v1",
    "middleware" => ["cors"]
], function(){
    Route::group(
        ["middleware" => []
    ], function(){
        Route::prefix("classroom")->group(function(){
            Route::get("/", [\App\Http\Controllers\ReadController::class, "getAllClassroom"]);
            Route::post("/", [\App\Http\Controllers\CreateController::class, "CreateClassroom"]);
            Route::put("/", [\App\Http\Controllers\UpdateController::class, "UpdateClassroom"]);
            Route::delete("/", [\App\Http\Controllers\DeleteController::class, "DeleteClassroom"]);
            Route::delete("/multiple", [\App\Http\Controllers\DeleteController::class, "DeleteMultipleClassroom"]);
        });

        Route::prefix("attandence")->group(function(){
            Route::get("/records", [\App\Http\Controllers\ReadController::class, "getAllAttadenceRecords"]);
        });

        Route::prefix("students")->group(function(){
            Route::get("/", [\App\Http\Controllers\ReadController::class, "getAllStudentData"]);
            Route::post('/', [\App\Http\Controllers\CreateController::class, "CreateStudent"]);
            Route::put("/", [\App\Http\Controllers\UpdateController::class, "UpdateStudent"]);
            Route::delete('/', [\App\Http\Controllers\DeleteController::class, "DeleteStudent"]);
            Route::delete('/multiple', [\App\Http\Controllers\DeleteController::class, "DeleteMultipleStudent"]);
        });

        Route::prefix("violations")->group(function(){
            Route::get("/", [\App\Http\Controllers\ReadController::class, "getAllViolationData"]);
            Route::post("/", [\App\Http\Controllers\CreateController::class, "CreateViolation"]);
            Route::put("/", [\App\Http\Controllers\UpdateController::class, "UpdateViolation"]);
            Route::delete("/", [\App\Http\Controllers\DeleteController::class, "DeleteViolation"]);
            Route::delete("/multiple", [\App\Http\Controllers\DeleteController::class, "DeleteMultipleViolation"]);

            Route::prefix("student")->group(function(){
                Route::get("/", [\App\Http\Controllers\ReadController::class, "GetAllStudentViolationRecords"]);
                Route::post("/", [\App\Http\Controllers\CreateController::class, "InsertIntoStudentViolationMapping"]);
            });
        });

        Route::prefix("achievements")->group(function(){
            Route::get("/", [\App\Http\Controllers\ReadController::class, "getAllAchivementData"]);
            Route::post("/", [\App\Http\Controllers\CreateController::class, "CreateAchievement"]);
            Route::put("/", [\App\Http\Controllers\UpdateController::class, "UpdateAchievement"]);
            Route::delete("/", [\App\Http\Controllers\DeleteController::class, "DeleteAchievement"]);
            Route::delete("/multiple", [\App\Http\Controllers\DeleteController::class, "DeleteMultipleAchievement"]);

            Route::prefix("student")->group(function(){
                Route::get("/", [\App\Http\Controllers\ReadController::class, "GetAllStudentAchievementRecords"]);
                Route::post("/", [\App\Http\Controllers\CreateController::class, "InsertIntoStudentAchievementMapping"]);
                Route::put("/", [\App\Http\Controllers\UpdateController::class, "UpdateMappingStudentAchievement"]);
                Route::delete("/", [\App\Http\Controllers\DeleteController::class, "DeleteMappingStudentAchievement"]);
                Route::delete("/multiple", [\App\Http\Controllers\DeleteController::class, "DeleteMultipleMappingStudentAchievement"]);
            });
        });

        Route::prefix("gender")->group(function(){
            Route::get('/', [\App\Http\Controllers\ReadController::class, "getAllGender"]);
        });

        Route::prefix("attandencepermit")->group(function(){
            Route::get("/", [\App\Http\Controllers\ReadController::class, "GetStudentAttandencePermit"]);
            Route::post('/', [\App\Http\Controllers\CreateController::class, "CreateStudentAttandencePermit"]);
            Route::put("/", [\App\Http\Controllers\UpdateController::class, "UpdateStudentAttandencePermit"]);
            Route::delete("/", [\App\Http\Controllers\DeleteController::class, "DeleteStudentAttandencePermit"]);
        });

        Route::prefix("permittype")->group(function(){
            Route::get('/', [\App\Http\Controllers\ReadController::class, "getAllPermitType"]);
            Route::post("/", [\App\Http\Controllers\CreateController::class, "CreateAttandencePermitType"]);
            Route::put("/", [\App\Http\Controllers\UpdateController::class, "UpdatePermitType"]);
        });
    });
});