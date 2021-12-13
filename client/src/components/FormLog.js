import '../App.css';
import {useState, useEffect, useContext} from 'react'
import BookClubContext from '../context/BookClubContext'
import { Link, navigate } from '@reach/router';

function FormLog({handleSubmit, oneLog, log, setLog, submitText, errs}){
    const {initialLog}  = useContext(BookClubContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        //filling form with given log data
        if(oneLog) setLog(oneLog)
        setLoaded(true)
    }, [])

    function handleChange(e) {
            const newLog = {...log, [e.target.name]:e.target.value}
            setLog(newLog)
        }

    return (
        <form>
            {loaded && (<>
            <div>
                <p>
                    <label htmlFor="bookTitle" style={{marginRight: "10px"}}>
                        Book Title:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.bookTitle&&'textInputErr'}`} name="bookTitle" value = {log.bookTitle} onChange = {handleChange} type="text" id="bookTitle"/>
                </p>
                <p className="errMsg">{errs?.errors?.bookTitle?.message}</p>
                <p>
                    <label htmlFor="writerName" style={{marginRight: "10px"}}>
                        Writer:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.writerName&&'textInputErr'}`} name="writerName" value = {log.writerName} onChange = {handleChange} type="text" id="writerName"/>
                </p>
                <p className="errMsg">{errs?.errors?.writerName?.message}</p>
                <p>
                    <label htmlFor="review" style={{marginRight: "10px"}}>
                        Review:
                    </label><br/>
                    <textarea className={`textArea ${errs?.errors?.review&&'textInputErr'}`} name="review" value = {log.review} onChange = {handleChange} id="review"/>
                </p>
                <p className="errMsg">{errs?.errors?.review?.message}</p>
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

export default FormLog
{/* <input type="checkbox" name="instock" checked={log.instock} onChange={handleChange}/>
<label htmlFor="instock">In Stock?</label> */}
