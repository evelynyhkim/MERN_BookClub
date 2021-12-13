import React, {useState, useContext} from "react"
import BookClubContext from '../context/BookClubContext'
//import styles from "./logs/NewLog.module.css"
import axios from 'axios'
import {navigate} from '@reach/router'

function DeleteLog({log, callback}) {
	const {logs, setLogs, socket} = useContext(BookClubContext)
    const [errs, setErrs] = useState()

	function handleDelete(idToDelete) {
		socket.emit("DeleteRequest", idToDelete)
		navigate('/')
	}

	return (<>
		<button className='btnDelete' onClick={()=>handleDelete(log._id)}>Delete</button>
		{errs && <p>{errs.message}</p>}
	</>)
}

export default DeleteLog