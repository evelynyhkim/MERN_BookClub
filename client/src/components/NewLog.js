import React, {useState, useContext, useEffect} from "react"
import BookClubContext from '../context/BookClubContext'
import axios from 'axios'
import Header from './Header'
import FormLog from "./FormLog"
import {navigate} from '@reach/router'

function NewLog() {
    const {initialLog} = useContext(BookClubContext)
    const [log, setLog] = useState(initialLog)
    const [errs, setErrs] = useState()
    
	function handleNew(e) {
		e.preventDefault()
		console.log('localStorage userId: '+localStorage.getItem('userId'))
        
		axios.post('http://localhost:8000/api/logs/new', {userId: localStorage.getItem("userId"), ...log})
		//axios.post('http://localhost:8000/api/logs/new', log)
		.then(res=>{
			console.log(res.data)
			navigate('/logs/all')
		})
		.catch(err => {
			if (err.response) {
			    console.log('Error response ', err.response.data);
                setErrs(err.response.data)
			} else if (err.request) {
			    console.log('Request error', err.request);
			} else {
			    console.log('Other error', err.message);
			}
		})
	}
	return (<>
        <Header userId={localStorage.getItem("userId")}/>
        {localStorage.getItem('userId')?<FormLog handleSubmit={handleNew} oneLog={""} log={log} setLog={setLog} submitText="Submit" errs={errs}/>
		:<p>Sign in to add a log</p>}
    </>)
}

export default NewLog