export default class AchievementService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getAllAchievement(){
        return fetch(`${this.url}achievements`, {
            method: "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    createAchievement(data){
        return fetch(`${this.url}achievements`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            }, 
            body : JSON.stringify({
                "name" : data.name,
                "description" : data.description,
                "achievement_code" : data.achievement_code,
                "score" : data.score,
                "active_status" : data.active_status,
            })
        })
        .then(res => res.json())
        .then(d => d)
    }

    updateAchievement(data){
        return fetch(`${this.url}achievements`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            }, 
            body : JSON.stringify({
                "id" : data.id,
                "name" : data.name,
                "description" : data.description,
                "achievement_code" : data.achievement_code,
                "score" : data.score,
                "active_status" : data.active_status,
            })
        })
        .then(res => res.json())
        .then(d => d)
    }

    deleteAchievement(id){
        return fetch(`${this.url}achievements`, {
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

    deleteMultipleAchievement(data){
        return fetch(`${this.url}achievements/multiple`, {
            method : "DELETE",
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