<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    public function UpdateClassroom(Request $req)
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
