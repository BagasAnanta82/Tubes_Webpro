<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Storage;

class DeleteController extends Controller
{
    public function DeleteStudent(Request $req)
    {
        try {
            \App\Models\Student::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "success delete student",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed delete student",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function DeleteAchievement(Request $req)
    {
        try {
            \App\Models\Achievements::where("id", $req->id)->delete();

            return response()->json(
                [
                    "message" => "Success on delete achievement",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to delete achievement",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public function DeleteViolation(Request $req)
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

    public function DeleteClassroom(Request $req)
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

    public function DeleteStudentAttandencePermit(Request $req)
    {
        try {
            \App\Models\Attandence_Permit::where("id", $req->attandence_permit_id)->delete();

            return response()->json(
                [
                    "message" => "Success on update student permit",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to update student permit",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}
