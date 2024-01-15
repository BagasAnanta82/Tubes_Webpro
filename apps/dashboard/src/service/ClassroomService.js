export default class ClassroomService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        // this.token = JSON.parse(window.localStorage.getItem("token")).token
    }

    getAllClassroom(){
        return fetch(`${this.url}classroom`, {
            method : "GET",
            headers : {
            //   "Authorization" : `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(data => data.data)
    }
}