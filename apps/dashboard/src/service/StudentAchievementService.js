export default class StudentAchievementService{
    url
    token

    constructor (){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getAllStudentAchievement(){
        return fetch(`${this.url}achievements/student`, {
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    getStudentAchievementById(id){
        return fetch(`${this.url}achievements/student/${id}`, {
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    createStudentAchievement(data){
        return fetch(`${this.url}achievements/student`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "achievement_id" : data.achievement.id,
                "description" : data.description,
                "students" : data.students
            })
        })
        .then(res => res.json())
        .then(d => d)
    }

    deleteStudentAchievement(id){
        return fetch(`${this.url}achievements/student`, {
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
}