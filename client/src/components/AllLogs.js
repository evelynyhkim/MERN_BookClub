import React, {useEffect, useState, useContext} from "react"
//import {BookClubContext} from '../context/BookClubContext'
import BookClubContext from '../context/BookClubContext'
import axios from 'axios'
import DisplayAll from './DisplayAll'
import Header from './Header'

function AllLogs() {
    const [loaded, setLoaded] = useState(false)
    const {socket, logs, setLogs}  = useContext(BookClubContext)
    const [refreshToggle, setRefreshToggle] = useState(false)
    
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
    }, [refreshToggle])

    function handleLike(e, likedId, idx){
        //e.target.disabled = true
        socket.emit("Liked", likedId)
        //setRefreshToggle(!refreshToggle)
        // let newLogs = logs.map((item, index) => {
        //     if(index===idx) return {likes: item.likes+=1, ...item}
        //     else return item
        // })
        // setLogs(newLogs)
    }

    function handleClip(e, clippedId){
        //e.target.disabled = true
        axios.post("http://localhost:8000/api/user/" + localStorage.getItem("userId") + "/" + clippedId)
        .then(res => {
            console.log(res.data)
            setLoaded(true)
            //setLog(res.data)
        })
        .catch(err => {
            if(err.response) {
                console.log('Error response ', err.response.data);
                //setErrs(err.response.data)
			} else if (err.request) {
			    console.log('Request error ', err.request);
			} else {
			    console.log('Other error', err.message);                
            }
        }) 
    }

    return (<>
        {loaded && <>
            <Header userId={localStorage.getItem("userId")}/>
            {localStorage.getItem('userId')?<DisplayAll logs={logs} handleLike={handleLike} handleClip={handleClip} refreshToggle={refreshToggle}/>:<p>Sign in to see logs</p>}
        </>}
    </>)
}

export default AllLogs