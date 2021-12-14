import './App.css';
import React, {useEffect, useState} from 'react'
import BookClubContext from './context/BookClubContext'
import {Router, navigate} from '@reach/router'
import Home from './components/Home'
import AllLogs from './components/AllLogs'
import NewLog from './components/NewLog'
import Library from './components/Library'
import UpdateLog from './components/UpdateLog'
import NewUser from './components/NewUser'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import io from 'socket.io-client'
import axios from 'axios'

function App() {
  
  const [logs, setLogs] = useState([])
  const [socket] = useState(()=>io('http://localhost:5000'))
  
  const initialLog = {
    bookTitle: "",
    writerName: "",
    review: "",
    likes: 0
  }

  const initialUser = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPw: ""
  }

  const initialSignIn = {
    email: "",
    password: ""
  }
  
  useEffect(()=>{
    console.log("App (re)rendered")
    
    socket.on("connect", ()=>{
      console.log("connecting socket")
      
      socket.on("UpdateLikes", arg=>{
        console.log("Update likes for log _id: " + arg._id)
      
        axios.get("http://localhost:8000/api/logs")
        .then(res => {
            console.log(res.data)
            setLogs(res.data.sort(arrOrder))
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
      })
     
      function arrOrder(a, b){
        return a.ptype < b.ptype ? -1: (a.ptype > b.ptype ? 1:0)
      }
      socket.on("DeleteLog", arg=>{
        console.log("Delete log with _id: " + arg._id)
        axios.get("http://localhost:8000/api/logs")
        .then(res => {
            console.log(res.data)
            setLogs(res.data.sort(arrOrder))
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
      })
    })

    return ()=>{socket.disconnect(true)}
    
  }, [socket])

  return (
    <div className="App">
      <BookClubContext.Provider value={{logs, setLogs, initialLog, socket, initialUser, initialSignIn}}>
        
        <Router>
          <Home path="/"/>
          <NewUser path="/signup"/>
          <SignIn path="/signin"/>
          <SignOut path="/singhout"/>
          <AllLogs path="/logs/all"/>
          <NewLog path="/logs/new"/>
          <UpdateLog path="/logs/:id/edit"/>
          <Library path="/library"/>
        </Router>
      </BookClubContext.Provider>

    </div>
    );
}
export default App;
      // <h1>Favorite logs</h1>
      // <p><Link to='/logs/new'>Add a log</Link><Link to='/'>See All</Link></p>
      // <hr/>
      