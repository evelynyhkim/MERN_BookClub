import React, {useState, useContext, useEffect} from "react"
import BookClubContext from '../context/BookClubContext'
import axios from 'axios'
import Header from './Header'
import FormUser from "./FormUser"
import {Link, navigate} from '@reach/router'

function NewUser() {
    const {initialUser} = useContext(BookClubContext)
    const [user, setUser] = useState(initialUser)
    const [errs, setErrs] = useState()
    
	function handleNew(e) {
		e.preventDefault()
        axios.post('http://localhost:8000/api/users/new', user)
		.then(res=>{
			console.log(res.data)
			navigate('/signin', {state: {message: "Your new account has been created! Please sign in."}})
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
        <Header/>
        <FormUser handleSubmit={handleNew} oneUser={""} user={user} setUser={setUser} submitText="Submit" errs={errs}/>
    </>)
}

export default NewUser