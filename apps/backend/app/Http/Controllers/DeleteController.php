<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DeleteController extends Controller
{
    public function revokeUserCurrentToken(Request $req)
    {
        return \App\Services\AuthenticationServices::revokeCurrentToken($req);
    }

    public function DeleteStudent(Request $req)
    {
        return \App\Services\StudentServices::deleteStudent($req);
    }

    public function DeleteMultipleStudent(Request $req)
    {
        return \App\Services\StudentServices::deleteMultipleStudent($req);
    }

    public function DeleteMultipleClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::DeleteMultipleClassroom($req);
    }

    public function DeleteAchievement(Request $req)
    {
        return \App\Services\AchievementServices::DeleteAchievement($req);
    }

    public function DeleteMultipleAchievement(Request $req)
    {
        return \App\Services\AchievementServices::DeleteMultipleAchievement($req);
    }

    public function DeleteViolation(Request $req)
    {
        return \App\Services\ViolationServices::deleteViolation($req);
    }

    public function DeleteMappingStudentViolation(Request $req)
    {
        return \App\Services\StudentViolationServices::deleteStudentViolationRecords($req);
    }

    public function DeleteMultipleViolation(Request $req)
    {
        return \App\Services\ViolationServices::deleteMultipleViolation($req);
    }

    public function DeleteClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::DeleteClassroom($req);
    }

    public function DeleteMappingStudentAchievement(Request $req)
    {
        return \App\Services\StudentAchievementServices::deleteMappingStudentAchievement($req);
    }

    public function DeleteMultipleMappingStudentAchievement(Request $req)
    {
        return \App\Services\StudentAchievementServices::deleteMutlipleMappingStudentAchievement($req);
    }

    public function DeleteStudentAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::deleteStudentAttandencePermit($req);
    }

    public function DeleteMultipleAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::deleteMultipleStudentAttandencePermit($req);
    }

    public function DeleteAttandencePermitType(Request $req)
    {
        return \App\Services\PermitTypeServices::deleteAttandencePermitType($req);
    }

    public function DeleteMultipleAttandencePermitType(Request $req)
    {
        return \App\Services\PermitTypeServices::deleteMultipleAttandencePermitType($req);
    }
}
