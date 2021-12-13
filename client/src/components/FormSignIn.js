import '../App.css';
import {useState, useEffect, useContext} from 'react'
import BookClubContext from '../context/BookClubContext'
import { Link, navigate } from '@reach/router';

function FormSignIn({handleSubmit, oneSignIn, signIn, setSignIn, submitText, errs}){
    const {initialSignIn}  = useContext(BookClubContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        //filling form with given user data
        //if(oneSignIn) setSignIn(oneSignIn)
        setLoaded(true)
    }, [])

    function handleChange(e) {
        const newSignIn = {...signIn, [e.target.name]:e.target.value}
        setSignIn(newSignIn)
    }

    return (
        <form>
            {loaded && (<>
            <div>
            <p>
                    <label htmlFor="email" style={{marginRight: "10px"}}>
                        Email:
                    </label><br/>
                    <input className='textInput' name="email" value = {signIn.email} onChange = {handleChange} type="text" id="email"/>
                </p>
                <p>
                    <label htmlFor="password" style={{marginRight: "10px"}}>
                        Password:
                    </label><br/>
                    <input className='textinput' name="password" value = {signIn.password} onChange = {handleChange} type="password" id="password"/>
                </p>
                <p className="errMsg">{errs?.message}</p>
                <p><button className='submit' onClick={()=>navigate('/')}>Cancel</button>
                    <input className='submit'
                    type="submit"
                    value={submitText}
                    onClick={handleSubmit}
                    />
                </p>
                <p><span>Don't have an account yet? Sign up </span><Link to="/signup">here</Link></p>
            </div>
            </>)}
        </form>
    )
}

export default FormSignIn
{/* <input type="checkbox" name="instock" checked={signIn.instock} onChange={handleChange}/>
<label htmlFor="instock">In Stock?</label> */}
