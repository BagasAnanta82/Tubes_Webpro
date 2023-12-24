import React, { useEffect, useRef } from 'react'
import { redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
    const email = useRef()
    const password = useRef()

    useEffect(() => {
        if (window.localStorage.getItem("token") != null) {
            redirect("/")
        }
    }, [])

    const handleLogin = async () => {
        const URL = import.meta.env.VITE_API_URL_V1;
        const emailInp = email.current.value;
        const passwordInp = password.current.value;

        const getAuthToAPI = await fetch(`${URL}user/auth`, {
            method: "POST",
            headers : {
                "Accept" : "*/*",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                "email" : emailInp,
                "password" : passwordInp
            })
        })
        const json = await getAuthToAPI.json()

        if (json.status == false) {
            Swal.fire(
                "Gagal Authentikasi",
                json.message,
                "error"
            )
            return
        }

        Swal.fire(
            "Berhasil Authentikasi",
            "Anda Akan Diarahkan Ke Halaman Utama",
            "success"
        )

        window.localStorage.setItem("token", JSON.stringify(json.data))
        window.location.href = "/"
    }

    return (
        <>
            <div className="container" style={{ justifyContent: "center", alignContent: "center" }}>
                <br /><br /><br /><br /><br />
                <div className="columns is-vcentered is-mobile is-centered">
                    <div className="column is-half">
                        <h1 className='title is-1'>Login SMAN 24 Bandung</h1>
                        <br />
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" ref={email} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password" ref={password} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success" onClick={handleLogin}>
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login