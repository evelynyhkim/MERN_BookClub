import '../App.css';
import {useState, useEffect, useContext} from 'react'
import BookClubContext from '../context/BookClubContext'
import { Link, navigate } from '@reach/router';

function FormUser({handleSubmit, oneUser, user, setUser, submitText, errs}){
    const {initialUser}  = useContext(BookClubContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        //filling form with given user data
        //if(oneUser) setUser(oneUser)
        setLoaded(true)
    }, [])

    function handleChange(e) {
            const newUser = {...user, [e.target.name]:e.target.value}
            setUser(newUser)
        }

    return (
        <form>
            {loaded && (<>
            <div>
            <p>
                    <label htmlFor="email" style={{marginRight: "10px"}}>
                        Email:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.email&&'textInputErr'}`} name="email" value = {user.email} onChange = {handleChange} type="text" id="email"/>
                </p>
                <p className="errMsg">{errs?.errors?.email?.message}</p>
                <p>
                    <label htmlFor="firstName" style={{marginRight: "10px"}}>
                        First Name:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.firstName&&'textInputErr'}`} name="firstName" value = {user.firstName} onChange = {handleChange} type="text" id="firstName"/>
                </p>
                <p className="errMsg">{errs?.errors?.firstName?.message}</p>
                <p>
                    <label htmlFor="lastName" style={{marginRight: "10px"}}>
                        Last Name:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.lastName&&'textInputErr'}`} name="lastName" value = {user.lastName} onChange = {handleChange} type="text" id="lastName"/>
                </p>
                <p className="errMsg">{errs?.errors?.lastName?.message}</p>
                <p>
                    <label htmlFor="password" style={{marginRight: "10px"}}>
                        Password:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.password&&'textInputErr'}`} name="password" value = {user.password} onChange = {handleChange} type="password" id="password"/>
                </p>
                <p className="errMsg">{errs?.errors?.password?.message}</p>
                <p>
                    <label htmlFor="confirmPw" style={{marginRight: "10px"}}>
                        Confirm Password:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.confirmPw&&'textInputErr'}`} name="confirmPw" value = {user.confirmPw} onChange = {handleChange} type="password" id="confirmPw"/>
                </p>
                <p className="errMsg">{errs?.errors?.confirmPw?.message}</p>
                <p><button className='submit'onClick={()=>navigate('/')}>Cancel</button>
                    <input className='submit'
                    type="submit"
                    value={submitText}
                    onClick={handleSubmit}
                    />
                </p>
            </div>
            </>)}
        </form>
    )
}

export default FormUser
{/* <input type="checkbox" name="instock" checked={user.instock} onChange={handleChange}/>
<label htmlFor="instock">In Stock?</label> */}
