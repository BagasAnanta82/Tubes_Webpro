<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ReadController extends Controller
{
    public function authenticateUser(Request $req)
    {
        return \App\Services\AuthenticationServices::AuthUser($req);
    }

    public function checkUserTokenAvailability(Request $req)
    {
        return \App\Services\AuthenticationServices::checkTokenAvailability($req);
    }

    public function getAllClassroom(Request $req)
    {
        return \App\Services\ClassroomServices::GetAllClassroomData($req);
    }

    public function getAllAchivementData(Request $req)
    {
        return \App\Services\AchievementServices::GetAllAchievements($req);
    }

    public function getAllViolationData(Request $req)
    {
        return \App\Services\ViolationServices::getAllViolation($req);
    }

    public function getAllGender(Request $req)
    {
        return \App\Services\GenderServices::getAllGender($req);
    }

    public function getAllPermitType(Request $req)
    {
        return \App\Services\PermitTypeServices::getAllPermitType($req);
    }

    public function getAllStudentData(Request $req)
    {
        return \App\Services\StudentServices::getAllStudentData($req);
    }


    public function getAllAttadenceRecords(Request $req)
    {
        return \App\Services\AttandenceServices::GetAllStudentAttandeces($req);
    }

    public function GetStudentAttandencePermit(Request $req)
    {
        return \App\Services\PermitServices::GetAllStudentPermitRecords($req);
    }

    public function GetAllStudentAchievementRecords(Request $req)
    {
        return \App\Services\StudentAchievementServices::getAllStudentAchivementRecords($req);
    }

    public function GetStudentAchievementRecordsById(string $id)
    {
        return \App\Services\StudentAchievementServices::findAchievementByUserId($id);
    }

    public function GetAllStudentViolationRecords(Request $req)
    {
        return \App\Services\StudentViolationServices::getAllStudentViolationRecords($req);
    }

    public function GetStudentViolationRecordsById(string $id)
    {
        return \App\Services\StudentViolationServices::getStudentViolationRecordsById($id);
    }

    public function GetStaticDashboard(Request $req)
    {
        return \App\Services\StaticDataDashboardServices::getDataDashboardStatic($req);
    }

    public function exportExcelStudentAttandence(Request $req)
    {
        return \App\Services\AttandenceServices::exportStudentAttandence($req);
    }
}
