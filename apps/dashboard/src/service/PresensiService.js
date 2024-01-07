export default class PresensiService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem("token")).token
    }

    getStudentAttendences(date_at = new Date().toISOString()){
        return fetch(`${this.url}attandence/records?date_at=` + date_at, {
            "method" : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then((res) => res.json())
         .then((json) => json.data)
    }
}