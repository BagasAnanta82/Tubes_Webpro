<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;

class AttandenceTimeServices{
    public static function getAttandenceTime(Request $req)
    {
        try {
            $data = \App\Models\Attandence_Time::select(
                "id",
                "hours",
                "minutes",
                "updated_at"
            )
             ->get();
            
            return response()->json(
                [
                    "message" => "success on get attandence time",
                    "status" => true,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to get attandence time",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function updateAttandenceTime(Request $req)
    {
        try {
            \App\Models\Attandence_Time::where("id", $req->id)->update(
                [
                    "hours" => $req->hours,
                    "minutes" => $req->minutes
                ]
            );

            return response()->json(
                [
                    "message" => "success on update attandence time",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to update attandence time",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}