<?php

namespace App\Services;

use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PermitServices
{
    public static function GetAllStudentPermitRecords(Request $req)
    {
        try {
            $start_time = microtime(true);

            if ($req->date_at) {
                $date_at = \Carbon\Carbon::parse($req->date_at)->toDateTime();
            }else{
                $date_at = \Carbon\Carbon::now()->toDateTime();
            }

            $data = \App\Models\Attandence_Permit::select(
                "attandence_permits.id",
                "s.id as student_id",
                "s.name as student_name",
                "s.NIS",
                "s.NISN",
                "g.id as gender_id",
                "g.code",
                "c.id as classroom_id",
                "c.name as classroom_name",
                "apt.id as permit_type_id",
                "apt.name as permit_type_name",
                "d.id as document_id",
                "d.url as document_url",
                "attandence_permits.created_at",
                "attandence_permits.updated_at"
            )
             ->leftJoin("students as s", "s.id", "=", "attandence_permits.student_id")
             ->leftJoin("attandence_permit_types as apt", "apt.id", "=", "attandence_permits.attandence_permit_type_id")
             ->leftJoin("documents as d", "d.id", "=", "attandence_permits.document_id")
             ->leftJoin("classrooms as c", "c.id", "=", "s.classroom_id")
             ->leftJoin("genders as g", "g.id", "=", "s.gender_id")
             ->where("s.active_status", true)
             ->where("apt.active_status", true)
             ->whereDate("attandence_permits.created_at", $date_at)
             ->get();

            $end_time = microtime(true);
            $time = \number_format(($end_time - $start_time), 2);

            return response()->json(
                [
                    "message" => "success on get data",
                    "status" => true,
                    "response_time" => $time,
                    "data" => $data
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "failed to get permit attadance data",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function updateStudentPermit(Request $req)
    {
        try {
            if ($req->hasFile("document")) {
                // Delete Old Document
                $data = \App\Models\Attandence_Permit::select("document_id")->where("id", $req->attandence_permit_id)->first();
                \App\Models\Document::where("id", $data->document_id)->delete();
    
                // Create new document
                $document_url = Storage::url($req->file("document")->store("public/permits"));
                
                $document = \App\Models\Document::create(
                    [
                        "name" => $req->file("document")->getName(),
                        "document_type" => $req->file("document")->getType(),
                        "url" => $document_url
                    ]
                );
                $document_id = $document->id;
            }else{
                $document_id = null;
            }


            \App\Models\Attandence_Permit::where("id", $req->attandence_permit_id)->update(
                [
                    "attandence_permit_type_id" => $req->attandence_permit_type_id,
                    "document_id" => $document_id
                ]
            );

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

    public static function createStudentAttandencePermit(Request $req)
    {
        try {
            if (! $req->hasFile("document")) {
                throw new Exception("No File Included", 1);
            }

            $document_url = Storage::url($req->file("document")->store("public/permits"));

            $document = \App\Models\Document::create(
                [
                    "name" => $req->file("document")->getName(),
                    "document_type" => $req->file("document")->getType(),
                    "url" => $document_url
                ]
            );

            \App\Models\Attandence_Permit::create(
                [
                    "student_id" => $req->student_id,
                    "attandence_permit_type_id" => $req->attandence_permit_type_id,
                    "document_id" => $document->id
                ]
            );

            return response()->json(
                [
                    "message" => "Success on create studnet attandence permit",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed on create studnet attandence permit",
                    "status" => false,
                    "error" => $th->getMessage()
                ], 500
            );
        }
    }

    public static function deleteStudentAttandencePermit(Request $req)
    {
        try {
            \App\Models\Attandence_Permit::where("id", $req->attandence_permit_id)->delete();

            return response()->json(
                [
                    "message" => "Success on delete student permit",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            return response()->json(
                [
                    "message" => "Failed to delete student permit",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }

    public static function deleteMultipleStudentAttandencePermit(Request $req)
    {
        try {
            DB::beginTransaction();

            foreach ($req->json as $key => $value) {
                \App\Models\Attandence_Permit::where("id", $value["id"])->delete();
            }

            DB::commit();

            return response()->json(
                [
                    "message" => "Success on delete student permit",
                    "status" => true
                ]
            );
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json(
                [
                    "message" => "Failed to delete student permit",
                    "status" => false,
                    "error" => $th->getMessage()
                ]
            );
        }
    }
}