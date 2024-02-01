export default class SiswaService{
    url
    token

    constructor (){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getAllStudentData(){
        return fetch(`${this.url}students`, {
            "method" : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
          .then(res => res.json())
          .then(data => data.data)
    }

    createStudentData(studentsData){
        return fetch(`${this.url}students`, {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "Name" : studentsData.name,
                "NIS" : studentsData.NIS,
                "NISN" : studentsData.NISN,
                "gender_id" : studentsData.gender_id,
                "classroom_id" : studentsData.classroom_id.id,
                "active_status" : Boolean(studentsData.active_status)
            })
        })
         .then((res) => res.json())
         .then((data) => data)
    }

    updateStudentData(studentsData){
        console.log(studentsData);
        return fetch(`${this.url}students`, {
            "method" : "PUT",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : studentsData.student_id,
                "Name" : studentsData.name,
                "NIS" : studentsData.NIS,
                "NISN" : studentsData.NISN,
                "gender_id" : studentsData.gender_id,
                "classroom_id" : studentsData.classroom_id.id,
                "active_status" : Boolean(studentsData.active_status)
            })
        })
         .then((res) => res.json())
         .then((data) => data)
    }

    deleteStudent(id){
        return fetch(`${this.url}students`, {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : id
            })
        })
        .then((res) => res.json())
        .then((d) => d)
    }

    deleteMultipleStudent(data){
        return fetch(`${this.url}students/multiple`, {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "json" : data
            })
        })
        .then((res) => res.json())
        .then((d) => d)
    }
}