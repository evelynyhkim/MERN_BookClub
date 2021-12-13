import React, {useState, useContext, useEffect} from "react"
import BookClubContext from '../context/BookClubContext'
import axios from 'axios'
import Header from './Header'
import FormSignIn from "./FormSignIn"
import {Link, navigate} from '@reach/router'

function SignIn({location}) {
    const {initialSignIn} = useContext(BookClubContext)
    const [signIn, setSignIn] = useState(initialSignIn)
    const [errs, setErrs] = useState()
    
	function handleSignIn(e) {
		e.preventDefault()
        axios.post('http://localhost:8000/api/signin', signIn)
		.then(res=>{
			console.log(res.data.message)
			localStorage.setItem("userId", res.data.id);
			localStorage.setItem("firstName", res.data.firstName);
			localStorage.setItem("lastName", res.data.lastName);
			
			navigate('/logs/all')
			//navigate('/logs/all', {state: {userId: res.data.userId}})
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
		<p>{location?.state?.message}</p>
        <FormSignIn handleSubmit={handleSignIn} oneUser={""} signIn={signIn} setSignIn={setSignIn} submitText="Submit" errs={errs}/>
    </>)
}

export default SignIn