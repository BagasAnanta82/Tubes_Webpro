import { useRouter } from "vue-router"

export default class AuthenticationService{
    url
    token
    route

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.route = useRouter()
        this.token = JSON.parse(window.localStorage.getItem('token')).token
    }

    async AuthUser(email, password){
        const res = await fetch(`${this.url}user/auth`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body : JSON.stringify({
                "email" : email,
                "password" : password
            })
        })
        const json = await res.json()
    
        if (json.status) {
            window.localStorage.setItem("token", JSON.stringify(json.data));
            this.route.push("/");
        }
    }

    async userLogOut(){
        const res = await fetch(`${this.url}user/revoke`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            }
        })
        const json = await res.json()
    
        if (json.status) {
            window.localStorage.setItem("token", JSON.stringify({token : "", email : ""}));
            this.route.push('auth');
        }
    }
    
    
}