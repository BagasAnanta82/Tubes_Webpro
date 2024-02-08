export default class AttendencePermitTypeService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getAllAttendencePermitTypeService(){
        return fetch(`${this.url}permittype`, {
            method: "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    getAttendencePermitTypeService(){
        return fetch(`${this.url}permittype/active`, {
            method: "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    createAttendencePermitTypeService(data){
        return fetch(`${this.url}permittype`, {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "name" : data.name,
                "active_status" : Boolean(data.active_status)
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    updateAttendencePermitTypeService(data){
        return fetch(`${this.url}permittype`, {
            "method" : "PUT",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : data.id,
                "name" : data.name,
                "active_status" : Boolean(data.active_status)
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    deleteAttendencePermitTypeService(data){
        return fetch(`${this.url}permittype`, {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : data.id,
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    deleteMutltipleAttandencePermitTypeService(data){
        return fetch(`${this.url}permittype/multiple`, {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "json" : data,
            })
        })
         .then(res => res.json())
         .then(d => d)
    }
}