//import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DatePicker from "react-datepicker";



function Dashboard() {

    const navigate = useNavigate();

    const [timeString, setTimeFlag] = useState('TIME IN');
    const [attendid, setAttendId] = useState('')
    const [timein, setTimein] = useState(new Date());
    const [timeout, setTimeout] = useState(new Date());
    const [allTimes, setAllTimes] = useState([]);
    const [allTimeString, setAllTimeString] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {

        getAttendance();

        getAllAttendance();
    }, [])


    useEffect(() => {

        console.log(startDate);

        searchByDate();
    }, [startDate])

    const searchByDate = () => {

        axios.get('http://localhost:8082/api/attendance/' + localStorage.getItem('ID') + '/search?date=' + startDate)
            .then(data => {
                console.log(data.data);
                makeAllTimeString(data)
                setAllTimes(data.data);
            })
            .catch(err => console.error(err));
    }


    const getAttendance = () => {

        axios.get('http://localhost:8082/api/attendance/' + localStorage.getItem('ID'))
            .then(data => {
                console.log(data.data)
                setAttendId(data.data._id);
                setTimein(new Date(data.data.timein))
                setTimeout(new Date(data.data.timeout))

                if (data.data.duration === "0") {
                    setTimeFlag('TIME OUT')
                }

            }).catch(err => console.error(err))
    }

    const getAllAttendance = () => {

        axios.get('http://localhost:8082/api/attendance/' + localStorage.getItem('ID') + '/all')
            .then(data => {
                setAllTimes(data.data);
                console.log(data.data);

                makeAllTimeString(data)



            })

    }

    const makeAllTimeString = (data) => {

        var hr = 0, sec = 0, min = 0;

        for (let item of data.data) {
            hr = hr + parseInt(item.hour);
            sec = sec + parseInt(item.second);
            min = min + parseInt(item.minute);
        }

        min = min + parseInt(sec / 60);

        sec = sec % 60;

        hr = hr + parseInt(min / 60);

        min = min % 60;

        console.log(hr, min, sec)

        setAllTimeString(hr + 'hr ' + min + 'min ' + sec + 'sec');
    }

    const getDateString = (str) => {
        var date = new Date(str);
        return date.toLocaleTimeString();

    }

    const getDate = (str) => {
        var date = new Date(str);
        return date.toLocaleDateString('en-GB')
    }

    const timeClick = () => {
        if (timeString === 'TIME IN') {
            setTimeFlag('TIME OUT')
        } else {
            setTimeFlag('TIME IN')
        }

        var time_in_out_body;

        const curDate = new Date();
        console.log(curDate)

        if (timeString === 'TIME IN') {

            time_in_out_body = {

                name: localStorage.getItem('username'),
                userID: localStorage.getItem("ID"),
                timein: curDate,
                timeout: curDate,
                duration: "0",
                role: localStorage.getItem('role')


            }
            axios.post('http://localhost:8082/api/attendance', time_in_out_body)
                .then(res => {
                    console.log(res)
                    setAttendId(res.data._id);
                    setTimein(new Date(res.data.timein));
                    setTimeout(new Date(res.data.timeout));
                    searchByDate();
                }).catch(err => console.error(err))


        } else {

            const timeOutDate = new Date();

            console.log(timein);

            const hours = parseInt(Math.abs(timeOutDate - timein) / (1000 * 60 * 60) % 24);
            const minutes = parseInt(Math.abs(timeOutDate.getTime() - timein.getTime()) / (1000 * 60) % 60);
            const seconds = parseInt(Math.abs(timeOutDate.getTime() - timein.getTime()) / (1000) % 60);

            time_in_out_body = {

                timeout: timeOutDate,
                duration: hours + 'hr ' + minutes + 'm ' + seconds + 's ',
                hour: hours,
                minute: minutes,
                second: seconds

            }

            axios.put('http://localhost:8082/api/attendance/' + attendid, time_in_out_body)
                .then(
                    res => {
                        console.log(res)
                        searchByDate();
                    }
                ).catch(err => console.error(err))
        }



    }




    return (
        <>
            <NavBar />
            <div className='w-[242px] px-10 py-10'>
                <DatePicker className="h-4 border-2" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />

            </div>
           
            <div className='col-md-12 text-center' style={{ marginTop: '12px' }}>
               

                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded " onClick={timeClick}>
                {timeString}
                </button>
            </div>
            <div className='col-md-12 total-time'>
                {allTimeString}
            </div>
            <div className='col-md-12 mx-8'>

                <table className='table-auto w-full rounded border-2 mb-[50px]'>
                    <thead className="bg-slate-600 text-white rounded">
                        <tr>
                            <th className="tab-header border border-slate-100">Date</th>
                            <th className="tab-header border border-slate-100">Name</th>
                            <th className="tab-header border border-slate-100">Time in</th>
                            <th className="tab-header border border-slate-100">Time out</th>
                            <th className="tab-header border border-slate-100">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTimes.map((item, key) => {
                                return <tr key={key} className="border-2 h-12">
                                    <td className="px-2 border">{getDate(item.timein)}</td>
                                    <td className="px-2 border">{item.name}</td>
                                    <td className="px-2 border">{getDateString(item.timein)}</td>
                                    <td className="px-2 border">{getDateString(item.timeout)}</td>
                                    <td className="px-2 border">{item.duration}</td>
                                </tr>
                            })
                        }
                    </tbody>



                </table>

            </div>


            {/* <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='d-flex align-self-center'>
                        <button className='btn btn-primary'>Time in</button>
                        </div>
                    </div>
                </div>
            </div> */}



        </>
    )

}

export default Dashboard;


