export default class HomePageService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem("token")).token
    }

    getDashboardData(){
        return fetch(`${this.url}static/dashboard`, {
            "method" : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then((res) => res.json())
         .then((data) => data.data)
    }

    getTopStudentsData(){
        return fetch(`${this.url}students`, {
            "method" : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then((res) => res.json())
         .then((data) => data.data.slice(0,5))
    }
}