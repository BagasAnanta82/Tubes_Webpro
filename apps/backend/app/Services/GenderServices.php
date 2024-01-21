<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;

class GenderServices{
    public static function getAllGender(Request $req)
    {
        try {
            $data = \App\Models\Gender::select(
                "id",
                "gender",
                "code"
            )->get();

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
}