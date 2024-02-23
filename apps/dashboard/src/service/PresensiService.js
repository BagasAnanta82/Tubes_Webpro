export default class PresensiService{
    url
    token

    constructor(){
        this.url = import.meta.env.VITE_API_URL_V1
        this.token = JSON.parse(window.localStorage.getItem("token")).token
    }

    getStudentAttendences(date_at = new Date().toISOString(), classroom_id = null){
        return fetch(`${this.url}attandence/records?date_at=${date_at}&classroom_id=${classroom_id}`, {
            "method" : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then((res) => res.json())
         .then((json) => json.data)
    }

    async getStudentAttendencesExcelExport(date_at = new Date().toISOString()){
        const res = await fetch(`${this.url}excel/attandence?date_at=${date_at}`, {
            method : "GET",
            "headers" : {
                "Authorization" : `Bearer ${this.token}`
            }
        })
         .then(res => res.arrayBuffer())
         .then(d => d)
        const blob = new File([res], "filename.xlsx", {type : "application/vnd.ms-excel"})
        const urlBlob = URL.createObjectURL(blob)
        window.open(urlBlob)
    }

    generateStudentDidNotTapping(date_at = new Date().toISOString()){
        return fetch(`${this.url}attandence/generate`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${this.token}`
            },
            body : JSON.stringify({
                "date_at" : date_at
            })
        })
        .then(res => res.json())
        .then(d => d)
    }
}