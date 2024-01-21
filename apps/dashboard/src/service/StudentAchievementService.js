export default class StudentAchievementService{
    url
    token

    constructor (){
        this.url = import.meta.env.VITE_API_URL_V1
        // this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getAllStudentAchievement(){
        return fetch(`${this.url}achievements/student`, {
            method : "GET",
            headers : {
                // "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }
}