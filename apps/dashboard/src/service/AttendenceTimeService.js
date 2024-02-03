export default class AttendenceTime{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    getAttandenceTime(){
        return fetch(`${this.url}attandence/time`, {
            method: "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.json())
         .then(d => d.data)
    }

    updateAttandenceTime(data){
        return fetch(`${this.url}attandence/time`, {
            method: "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "id" : data.id,
                "hours" : data.hours,
                "minutes" : data.minutes
            })
        })
         .then(res => res.json())
         .then(d => d)
    }
}