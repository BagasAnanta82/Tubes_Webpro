export default class AttendencePermitService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getStudentAttandencePermitRecords(date_at = new Date().toISOString()){
        return fetch(`${this.url}attandencepermit?date_at=${date_at}`, {
            method: "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    updateStudentAttandencePermitRecords(data){
        return fetch(`${this.url}attandencepermit`, {
            method: "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "attandence_permit_id" : data.id,
                "attandence_permit_type_id" : data.permit_type_id.id,
                "description" : data.description
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    deleteStudentAttandencePermitRecord(data){
        return fetch(`${this.url}attandencepermit`, {
            method: "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "attandence_permit_id" : data.id,
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    deleteMutltipleStudentAttandencePermitRecord(data){
        return fetch(`${this.url}attandencepermit/multiple`, {
            method: "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "json" : data
            })
        })
         .then(res => res.json())
         .then(d => d)
    }
}