import React, {useEffect, useState, useContext} from "react"
//import {BookClubContext} from '../context/BookClubContext'
import BookClubContext from '../context/BookClubContext'
import axios from 'axios'
import DisplayAll from './DisplayAll'
import Header from './Header'

function Library() {
    const [loaded, setLoaded] = useState(true)
    const [library, setLibrary] = useState([])
    const {socket, logs, setLogs}  = useContext(BookClubContext)
    const [refreshToggle, setRefreshToggle] = useState(false)
    
    function arrOrder(a, b){
        return a.ptype < b.ptype ? -1: (a.ptype > b.ptype ? 1:0)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/library/${localStorage.getItem("userId")}`)
        .then(res => {
            console.log(res.data)
            setLibrary(res.data.library)
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

    function handleDeleteFromLibrary(idxToDelete, idToDelete){
        axios.delete("http://localhost:8000/api/library/" + localStorage.getItem("userId") + "/" + idToDelete)
        .then(res => {
            setLibrary(library.filter((book, idx)=>idx!=idxToDelete))
            console.log(res.data)
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
    }

    function handleClip(e, clippedId){
        //e.target.disabled = true
        axios.post("http://localhost:8000/api/library/" + localStorage.getItem("userId") + "/" + clippedId)
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
            <Header userId={localStorage.getItem("userId")} heading={"My Library"}/>
            {localStorage.getItem('userId')?
            <DisplayAll isLibrary={true} logs={library} handleDeleteFromLibrary={handleDeleteFromLibrary}/>
            :<p>Sign in to see logs</p>}
        </>}
    </>)
}

export default Library