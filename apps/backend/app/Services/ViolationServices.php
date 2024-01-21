<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class ViolationServices{
    public static function getAllViolation(Request $req)
    {
        try {
            $data = \App\Models\Violation::select(
                "id",
                "name",
                "violation_code",
                "score",
                "active_status",
            )
             ->orderBy("created_at", "ASC")
             ->get();

            return response()->json(
                [
                    "message" => "Success on get violation",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to get Data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function createViolation(Request $req)
    {
        try {
            \App\Models\Violation::create(
                [
                    "name" => $req->name,
                    "violation_code" => $req->violation_code,
                    "score" => $req->score,
                    "active_status" => $req->active_status,
                ]
            );

            return response()->json(
                [
                    "message" => "success on create violation",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to create violation",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function updateViolation(Request $req)
    {
        try {
            \App\Models\Violation::where("id", $req->id)->update(
                [
                    "name" => $req->name,
                    "violation_code" => $req->violation_code,
                    "score" => $req->score,
                    "active_status" => $req->active_status,
                ]
            );

            return response()->json(
                [
                    "message" => "Success on update violation",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update violation",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function deleteViolation(Request $req)
    {
        try {
            \App\Models\Violation::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "Success on delete violation",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to delete violation",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function deleteMultipleViolation(Request $req)
    {
        try {
            DB::beginTransaction();

            foreach ($req->json as $key => $value) {
                \App\Models\Violation::where("id", $value["id"])->delete();
            }

            DB::commit();

            return response()->json(
                [
                    "message" => "Success on delete violation",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json(
                [
                    "message" => "Failed to delete violation",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }       
    }
}