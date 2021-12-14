import React, {useState, useContext, useEffect} from "react"
//import styles from "./logs/NewLog.module.css"
import axios from 'axios'
import FormLog from "./FormLog"
import Header from './Header'
import {navigate, Link} from '@reach/router'
import BookClubContext from "../context/BookClubContext"

function UpdateLog({id}) {
    const [loaded, setLoaded] = useState(false)
	const [log, setLog] = useState()
    const [errs, setErrs] = useState()
    const [noLogErr, setNoLogErr] = useState(false)

	useEffect(()=>{
        axios.get('http://localhost:8000/api/logs/' + id)
        .then(res=>{
            console.log('got one log')
            setLog(res.data)
            setLoaded(true)
        })
		.catch(err => {
			if (err.response) {
			    console.log('Error response ', err);
                setErrs(err.response.data)
                setNoLogErr(true)
			} else if (err.request) {
			    console.log('Request error ', err.request);
			} else {
			    console.log('Other error', err.message);
			}

		})
    }, [])

	function handleUpdate(e) {
		e.preventDefault()
        axios.put('http://localhost:8000/api/logs/' + log._id + '/edit', log)
		.then(res=>{
			console.log(res.data)
            navigate('/logs/all')
		})
		.catch(err => {
			if (err.response) {
			    console.log('Error response ', err.response.data);
                setErrs(err.response.data)
			} else if (err.request) {
			    console.log('Request error ', err.request);
			} else {
			    console.log('Other error', err.message);
			}
		})
	}
	return (<>
		{noLogErr && <>
			<Header heading="We're sorry, but we could not find the log you are looking for. Would you like to add a log to our database?"/>
        	<Link to="/logs/new">Add a log</Link>
		</>}
        {loaded && (<>
			<Header heading={"Edit Log"}/>
			<FormLog handleSubmit={handleUpdate} oneLog={log} log={log} setLog={setLog} submitText="Submit" errs={errs}/>
		</>)}
    </>)
}

export default UpdateLog