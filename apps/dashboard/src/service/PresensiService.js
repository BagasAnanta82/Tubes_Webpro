export default class PresensiService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem("token")).token
    }

    getStudentAttendences(date_at = new Date().toISOString(), classroom_id = null){
        return fetch(`${this.url}attandence/records?date_at=${date_at}&classroom_id=${classroom_id}`, {
            "method" : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then((res) => res.json())
         .then((json) => json.data)
    }

    getStudentAttendencesByStudentId(student){
        return fetch(`${this.url}public/attandence/students?id=${student.student_id}&atk_id=5ea28465-8775-4154-ad32-35a16d74da1c`, {
            method : "GET",
        })
         .then(res => res.json())
         .then(data => data.data)
    }

    async getStudentAttendencesExcelExport(date_at = new Date().toISOString()){
        const res = await fetch(`${this.url}excel/attandence?date_at=${date_at}`, {
            method : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.arrayBuffer())
         .then(d => d)
        const blob = new File([res], "filename.xlsx", {type : "application/vnd.ms-excel"})
        const urlBlob = URL.createObjectURL(blob)
        window.open(urlBlob)
    }

    generateStudentDidNotTapping(date_at = new Date().toISOString()){
        return fetch(`${this.url}attandence/generate`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "date_at" : date_at
            })
        })
        .then(res => res.json())
        .then(d => d)
    }

    studentCheckIn(nis = null){
        return fetch(`${this.url}students/attandence/in`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "nis" : nis
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    studentCheckOut(nis = null){
        return fetch(`${this.url}students/attandence/out`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "nis" : nis
            })
        })
         .then(res => res.json())
         .then(d => d)
    }
}