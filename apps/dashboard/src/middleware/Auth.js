import {ref} from 'vue'

const isAuthenticate = ref(false)
const api_url = import.meta.env.VITE_API_URL_V1;

const isUserAuth = async () => {
    const res = await fetch(`${api_url}user/check`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : `Bearer ${JSON.parse(window.localStorage.getItem('token')).token}`
        }
    })
    const json = await res.json()

    if (json.message == "Unauthenticated." && res.status == 401) {
        isAuthenticate.value = false;
    }else{
        isAuthenticate.value = true;
    }
}

const authTokenGuard = async (to, from) => {
    if (window.localStorage.getItem("token") == null) {
        window.localStorage.setItem("token", JSON.stringify({token : "", email : ""}))
        return {name : "auth"}
    }

    await isUserAuth()


    if (to.name == "auth" && isAuthenticate.value) {
        return {name : "homepage"}
    }

    if (to.name !== "auth" && !isAuthenticate.value){
        return {name : "auth"}
    }

}

export { authTokenGuard }