import { useEffect, useState } from 'react'
import $ from 'jquery'
import 'datatables.net'

const Dashboard = () => {
    const URL = import.meta.env.VITE_API_URL_V1
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (window.localStorage.getItem("token") == null) {
            window.location.href = "/login"
        }

        getAllAttandenceRecordsData(URL)
        if (isLoading) {
            $("table").dataTable()
        }
    })

    const handleLogOut = async () => {
        window.localStorage.removeItem("token")
        window.location.href = "/login"
    }

    const getAllAttandenceRecordsData = async (url) => {
        const auth = JSON.parse(window.localStorage.getItem("token"))
        const getData = await fetch(`${url}attandence/records`, {
            method: "GET",
            headers: {
                "Authorization": auth.token
            }
        })
        const json = await getData.json()

        if (json.status == false) {
            return;
        }

        setData(json.data)
        setIsLoading(true)
    }

    if (!isLoading) {
        return (
            <>
                <div className="container">
                    <br /><br />
                    <div className="columns is-vcentered is-centered is-mobile">
                        <div className="column is-half">
                            <br /><br /><br /><br /><br /><br /><br />
                        <progress class="progress is-small is-primary" max="100">15%</progress>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container">
                <br /><br /><br />
                <div className="columns is-vcentered is-mobile is-centered">
                    <div className="column is-half">
                        <h1 className='title is-1'>Daftar Presensi SMAN24 Bandung</h1>

                        <br />
                        <div className="buttons">
                            <button class="button is-info is-light">Export Excel</button>
                            <button class="button is-warning is-light" onClick={handleLogOut}>Log Out</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIS</th>
                                    <th>NISN</th>
                                    <th>Nama</th>
                                    <th>Kelamin</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th>1</th>
                                    <td>38</td>
                                    <td>23</td>
                                    <td>12</td>
                                    <td>3</td>
                                    <td>68</td>
                                </tr> */}
                                {
                                    data.map((val, idx) => {
                                        return (
                                            <tr id={idx + 1}>
                                                <th>{idx + 1}</th>
                                                <td>{val.NIS}</td>
                                                <td>{val.NISN}</td>
                                                <td>{val.name}</td>
                                                <td>{val.code}</td>
                                                <td>{val.timestamp}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard