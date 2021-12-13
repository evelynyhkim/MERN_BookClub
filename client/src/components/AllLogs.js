import React, {useEffect, useState, useContext} from "react"
//import {BookClubContext} from '../context/BookClubContext'
import BookClubContext from '../context/BookClubContext'
import axios from 'axios'
import DisplayAll from './DisplayAll'
import Header from './Header'

function AllLogs() {
    const [loaded, setLoaded] = useState(false)
    const {logs, setLogs}  = useContext(BookClubContext)
    
    function arrOrder(a, b){
        return a.ptype < b.ptype ? -1: (a.ptype > b.ptype ? 1:0)
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/logs")
        .then(res => {
            console.log(res.data)
            setLogs(res.data.sort(arrOrder))
            setLoaded(true)
        })
        .catch(err => {
            if(err.response) {
                console.log('Error response ', err.response.data);
        	} else if (err.request) {
			    console.log('Request error ', err.request);
			} else {
			    console.log('Other error', err.message);   
            }
        })
    }, [])

    return (<>
        {loaded && <>
            <Header userId={localStorage.getItem("userId")}/>
            {localStorage.getItem('userId')?<DisplayAll logs={logs}/>:<p>Sign in to see logs</p>}
        </>}
    </>)
}

export default AllLogs