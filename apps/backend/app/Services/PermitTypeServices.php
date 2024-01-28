<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;

class PermitTypeServices{
    public static function getAllPermitType(Request $req)
    {
        try {
            $data = \App\Models\Attandence_Permit_Type::select(
                "id",
                "name",
                "active_status",
            )
             ->where("active_status", true)
             ->get();

            return response()->json(
                [
                    "message" => "Success on get Gender",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get gender",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function createPermitType(Request $req)
    {
        try {
            \App\Models\Attandence_Permit_Type::create(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_status
                ]
            );

            return response()->json(
                [
                    "message" => "Success on create attandence permit type",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on create attandence permit type",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function updatePermitType(Request $req)
    {
        try {
            \App\Models\Attandence_Permit_Type::where("id", $req->attandence_permit_type_id)->update(
                [
                    "name" => $req->name,
                    "active_status" => $req->active_status
                ]
            );

            return response()->json(
                [
                    "message" => "Success on update student",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update student",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}