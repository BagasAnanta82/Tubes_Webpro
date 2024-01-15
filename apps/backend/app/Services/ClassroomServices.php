<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use DB;

class ClassroomServices
{
    public static function GetAllClassroomData(Request $req)
    {
        try {
            $data = \App\Models\Classroom::all();

            return response()->json(
                [
                    "message" => "success to get data",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to get data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function CreateClassroom(Request $req)
    {
        try {
            \App\Models\Classroom::create(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_status
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to create classroom",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function UpdateClassroom(Request $req)
    {
        try {
            \App\Models\Classroom::where("id", $req->id)->update(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_Status
                ]
            );

            return response()->json(
                [
                    "message" => "Success on update classroom",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update classroom",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}
