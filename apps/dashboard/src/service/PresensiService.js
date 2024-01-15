export default class PresensiService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        // this.token = JSON.parse(window.localStorage.getItem("token")).token
    }

    getStudentAttendences(date_at = new Date().toISOString(), classroom_id = null){
        return fetch(`${this.url}attandence/records?date_at=` + date_at + "&classroom_id=" + classroom_id{
            "method" : "GET",
            "headers" : {
                // "Authorization" : `Bearer ${this.token}`
            }
        })
         .then((res) => res.json())
         .then((json) => json.data)
    }
}