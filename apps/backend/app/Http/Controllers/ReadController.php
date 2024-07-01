<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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

    public function GetPermitTypeActive(Request $req)
    {
        return \App\Services\PermitTypeServices::getActivePermitType($req);
    }

    public function getAllStudentData(Request $req)
    {
        return \App\Services\StudentServices::getAllStudentData($req);
    }

    public function getAllStudentActivceData(Request $req)
    {
        return \App\Services\StudentServices::getAllActiveStudent($req);
    }

    public function getAllAttadenceRecords(Request $req)
    {
        return \App\Services\AttandenceServices::GetAllStudentAttandeces($req);
    }

    public function getAttendenceRecordByStudentId(Request $req)
    {
        return \App\Services\AttandenceServices::GetStudentAttandenceByStudentId($req);
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

    public function exportExcelStudentAchievement(Request $req)
    {
        return \App\Services\StudentAchievementServices::exportStudentAchievementExcel($req);
    }

    public function exportExcelStudentViolation(Request $req)
    {
        return \App\Services\StudentViolationServices::exportStudentViolationExcel($req);
    }

    public function GetAttandenceTime(Request $req)
    {
        return \App\Services\AttandenceTimeServices::getAttandenceTime($req);
    }

    public function GetLatestStudentAttendances(Request $req)
    {
        return \App\Services\AttandenceServices::GetLatestStudentAttendances($req);
    }
}
