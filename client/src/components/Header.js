import React from 'react'
import SignOut from '../components/SignOut'
import {Link, navigate} from '@reach/router'
import DeleteLog from './DeleteLog'

function Header({userId, link, linkText, heading, log}){
    return (<>
        <div className="flexContainer">
            <h1 onClick={e=>navigate('/')}>Motive Book Club</h1>
            {userId?<p>Signed in as {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}&nbsp;<SignOut/></p>:
                (<button onClick={e=>navigate('/signin')}>Sign In</button>)}
        </div>
        <div className="navBar">
            <Link to="/">Home</Link>
            <Link to="/logs/new">New Log</Link>
            <Link to="/logs/all">All Logs</Link>
            <Link to="/library/">My Library</Link>
        </div>
        <div className>
            <p className='heading'>{heading}</p>
        </div>
    </>)
}

export default Header