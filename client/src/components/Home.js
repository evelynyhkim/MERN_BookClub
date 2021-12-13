import React, {useEffect, useState, useContext} from "react"
//import {BookClubContext} from '../context/BookClubContext'
import {Link} from '@reach/router'
import Header from './Header'
import '../App.css'

function Home(){
    return (<>
        <Header userId={localStorage.getItem("userId")}/>
        <div className='flexContainer'>
            <div>
                <p>Book of the Month</p>
                
            </div>
            <div>
                <p>About Motive Book Club</p>
                <p>We meet over Zoom on every Sunday at 9 AM PST. Sign up <span><Link to="/signup">here</Link></span> for more information.</p>
            </div>
        </div>
    </>)
}

export default Home
