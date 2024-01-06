export default class SiswaService{
    url

    constructor (){
        this.url = import.meta.env.VITE_API_URL_V1
    }

    async getAllStudentData(){
        return fetch(`${this.url}`)
            .then(res => res.json())
            .then(data => data.data)
    }
}