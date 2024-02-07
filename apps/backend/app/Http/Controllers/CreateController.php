<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CreateController extends Controller
{
    public function createUser(Request $req)
    {
        return \App\Services\AuthenticationServices::CreateNewUser($req);
    }

    public function CreateStudent(Request $req)
    {
        return \App\Services\StudentServices::createStudent($req);
    }

    public function CreateClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::CreateClassroom($req);
    }

    public function CreateAchievement(Request $req)
    {
        return \App\Services\AchievementServices::CreateAchievement($req);
    }

    public function CreateViolation(Request $req)
    {
        return \App\Services\ViolationServices::createViolation($req);
    }

    public function CreateStudentAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::createStudentAttandencePermit($req);
    }

    public function CreateAttandencePermitType(Request $req)
    {
        return \App\Services\PermitTypeServices::createPermitType($req);
    }

    public function InsertIntoStudentAchievementMapping(Request $req)
    {
        return \App\Services\StudentAchievementServices::createMappingStudentAchievement($req);
    }

    public function InsertIntoStudentViolationMapping(Request $req)
    {
        return \App\Services\StudentViolationServices::createStudentViolationRecords($req);
    }

    public function InsertIntoStudentAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::createStudentAttandencePermit($req);
    }

    public function geneateStudentAttandenceIsNotTapping(Request $req)
    {
        return \App\Services\AttandenceServices::generateStudentAttandenceNotTapping($req);
    }
}
