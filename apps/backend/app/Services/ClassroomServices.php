<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class ClassroomServices
{
    public static function GetAllClassroomData(Request $req)
    {
        try {
            $data = \App\Models\Classroom::select("id", "name", "active_status")->orderBy("id", "DESC")->get();

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

    public static function DeleteClassroom(Request $req)
    {
        try {
            \App\Models\Classroom::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "Success on delete classroom",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to delete classroom",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function DeleteMultipleClassroom(Request $req)
    {
        try {
            DB::beginTransaction();

            foreach ($req->json as $key => $value) 
            {
                \App\Models\Classroom::where("id", $value['id'])->delete();
            }

            DB::commit();
            return response()->json(
                [
                    "message" => "Success on delete classroom",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json(
                [
                    "message" => "Failed to delete classroom",
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
            return response()->json(
                [
                    "message" => "Success on create classroom",
                    "status" => true
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
                    "active_status" => $req->active_status
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
