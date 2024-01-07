export default class SiswaService{
    url
    token

    constructor (){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    async getAllStudentData(){
        return fetch(`${this.url}`, {
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(data => data.data)
    }
}