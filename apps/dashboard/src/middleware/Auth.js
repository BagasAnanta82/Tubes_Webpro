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

export {isAuthenticate, isUserAuth}