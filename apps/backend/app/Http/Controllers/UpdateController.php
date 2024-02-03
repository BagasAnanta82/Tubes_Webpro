<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UpdateController extends Controller
{
    public function UpdateClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::UpdateClassroom($req);
    }

    public function UpdatePermitType(Request $req)
    {
        return \App\Services\PermitTypeServices::updatePermitType($req);
    }

    public function UpdateStudent(Request $req)
    {
        return \App\Services\StudentServices::updateStudent($req);
    }

    public function UpdateViolation(Request $req)
    {
        return \App\Services\ViolationServices::updateViolation($req);
    }

    public function UpdateAchievement(Request $req)
    {
        return \App\Services\AchievementServices::UpdateAchievement($req);
    }

    public function UpdateMappingStudentAchievement(Request $req)
    {
        return \App\Services\StudentAchievementServices::updateMappingStudentAchievement($req);
    }

    public function UpdateStudentAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::updateStudentPermit($req);
    }

    public function UpdateAttandenceTime(Request $req)
    {
        return \App\Services\AttandenceTimeServices::updateAttandenceTime($req);
    }
}
