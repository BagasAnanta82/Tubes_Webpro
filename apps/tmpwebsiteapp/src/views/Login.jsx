import React, { useRef } from 'react'

const Login = () => {
    const email = useRef()
    const password = useRef()

    const handleLogin = () => {

    }

    return (
        <>
            <div className="container" style={{ justifyContent: "center", alignContent : "center" }}>
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