export default class ViolationService{
    url
    token

    constructor (){
        this.url = import.meta.env.VITE_API_URL_V1
        // this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getAllViolation(){
        return fetch(`${this.url}violations`, {
            method : "GET",
            headers : {
                // "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    createViolation(data){
        return fetch(`${this.url}violations`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                // "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "name" : data.name,
                "violation_code" : data.violation_code,
                "score" : data.score,
                "active_status" : data.active_status,
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    updateViolation(data){
        return fetch(`${this.url}violations`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                // "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : data.id,
                "name" : data.name,
                "violation_code" : data.violation_code,
                "score" : data.score,
                "active_status" : data.active_status,
            })
        })
         .then(res => res.json())
         .then(d => d)
    }
    
    deleteViolation(id){
        return fetch(`${this.url}violations`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                // "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : id
            })
        })
         .then(res => res.json())
         .then(d => d)
    }

    deleteMultipleViolation(data){
        return fetch(`${this.url}violations/multiple`, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                // "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "json" : data
            })
        })
         .then(res => res.json())
         .then(d => d)
    }
}