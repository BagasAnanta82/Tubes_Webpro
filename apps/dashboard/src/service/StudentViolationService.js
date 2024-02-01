export default class StudentViolationService{
    url
    token

    constructor (){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getStudentViolationById(id){
        return fetch(`${this.url}violations/student/${id}`, {
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    createStudentViolation(data){
        return fetch(`${this.url}violations/student`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "violation_id" : data.violation.id,
                "description" : data.description,
                "students" : data.students
            })
        })
        .then(res => res.json())
        .then(d => d)
    }

    deleteStudentViolation(id){
        return fetch(`${this.url}violations/student`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : id
            })
        })
        .then(res => res.json())
        .then(d => d)
    }

    async getStudentViolationExcelExport(){
        const res = await fetch(`${this.url}excel/violation`, {
            method : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.arrayBuffer())
         .then(d => d)
        const blob = new File([res], "filename.excel", {type : "application/vnd.ms-excel"})
        const urlBlob = URL.createObjectURL(blob)
        window.open(urlBlob)
    }
}