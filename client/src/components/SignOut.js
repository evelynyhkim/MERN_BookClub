import React, {useEffect} from 'react'
import axios from 'axios'
import Header from './Header'
import {navigate, Link} from '@reach/router'

function SignOut(){
    function handleSignOut(e){
        axios.get('http://localhost:8000/api/signout')
        .then(res=>{
            console.log(res.data)
            localStorage.removeItem("userId")
            navigate('/')
        })
        .catch(err => {
            if (err.response) {
                console.log('Error response ', err.response.data);
            } else if (err.request) {
                console.log('Request error', err.request);
            } else {
                console.log('Other error', err.message);
            }
        })
    }
	return (<>
        <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
    </>)
}

export default SignOut