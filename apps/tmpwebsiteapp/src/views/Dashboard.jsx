import { useEffect, useMemo, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';

const Dashboard = () => {
    const URL = import.meta.env.VITE_API_URL_V1
    const DateAt = useRef()
    const [data, setData] = useState([])
    const [dataFilter, setDataFilter] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (window.localStorage.getItem("token") == null) {
            window.location.href = "/login"
        }

        window.document.title = "Presensi"

        getAllAttandenceRecordsData(URL)
    }, [])

    const handleLogOut = async () => {
        window.localStorage.removeItem("token")
        window.location.href = "/login"
    }

    const handleDownloadExcelFile = async () => {
        window.open(`${URL}excel/attandence`, "_blank")
    }

    const handleChangeDate = async () => {
        getAllAttandenceRecordsData(URL, DateAt.current.value)
    }

    const columns = useMemo(() => [
        { name: "NIS", selector: row => row.NIS },
        { name: "NISN", selector: row => row.NISN },
        { name: "Name", selector: row => row.name },
        { name: "Gender", selector: row => row.code },
        { name: "Timestamp", selector: row => row.timestamp },
        { name: "Terlambat", selector: row => row.is_late ? "Terlambat" : "Tepat Waktu" },
    ])

    const getAllAttandenceRecordsData = async (url, date_at = new Date().toISOString()) => {
        const auth = JSON.parse(window.localStorage.getItem("token"))
        const getData = await fetch(`${url}attandence/records?date_at=` + date_at, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${auth.token}`
            }
        })
        const json = await getData.json()

        if (json.status == false && json.message == "please auth first.....") {
            window.location.href = "/login"
        }

        setData(json.data)
        setDataFilter(json.data)
        setIsLoading(true)
    }

    const handleFilter = (e) => {
        setDataFilter(data);

        if (e.target.value == '') {
            return;
        }

        let searchWord = e.target.value
        let filterRes = dataFilter.filter((word) => {
            return String(word.NIS).includes(searchWord)
                || String(word.name).toLowerCase().includes(String(searchWord).toLowerCase())
                || String(word.NISN).includes(searchWord)
        })

        setDataFilter(filterRes)
    }

    if (!isLoading) {
        return (
            <>
                <div className="container">
                    <br /><br />
                    <div className="columns is-vcentered is-centered is-mobile">
                        <div className="column is-half">
                            <br /><br /><br /><br /><br /><br /><br />
                            <progress className="progress is-small is-primary" max="100">15%</progress>
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
                <h1 className='title is-1'>Daftar Presensi SMAN24 Bandung</h1>

                <br />
                <div className="buttons">
                    <button className="button is-info is-light" onClick={handleDownloadExcelFile}>Export Excel</button>
                    <button className="button is-warning is-light" onClick={handleLogOut}>Log Out</button>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="date_at">Silahkan Pilih Tanggal Presensi: </label>
                    <input type="date" name="date_at" id="date_at" ref={DateAt} onChange={handleChangeDate} />
                </div>
                <div style={{ marginBottom: "10px", marginTop: "20px" }}>
                    <input type="text" placeholder='Search By NIS, NISN, Or Name' onChange={handleFilter} />
                </div>
                <div>
                    <DataTable
                        data={dataFilter}
                        columns={columns}
                        pagination={true}

                    />
                </div>
            </div>
        </>
    )
}

export default Dashboard