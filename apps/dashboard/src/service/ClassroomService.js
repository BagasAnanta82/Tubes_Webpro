export default class ClassroomService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem("token")).token
    }

    getAllClassroom(){
        return fetch(`${this.url}classroom`, {
            method : "GET",
            headers : {
              "Authorization" : `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(data => data.data)
    }

    deleteClassroom(id){
        return fetch(`${this.url}classroom`, {
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

    deleteMultipleClassroom(data){
        return fetch(`${this.url}classroom/multiple`, {
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

    createClassroom(data){
        return fetch(`${this.url}classroom`, {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "name" : data.name,
                "active_status" : data.active_status
            })
        })
         .then((res) => res.json())
         .then((data) => data)
    }

    updateClassroom(data){
        return fetch(`${this.url}classroom`, {
            method : "PUT",
            "headers" : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : data.id,
                "name" : data.name,
                "active_status" : data.active_status
            })
        })
        .then((res) => res.json())
        .then((data) => data)
    }
}