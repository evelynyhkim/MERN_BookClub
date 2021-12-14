import React, {useEffect, useState, useContext} from "react"
import {navigate, Link} from '@reach/router'
import DeleteLog from "./DeleteLog"
import {DateTime} from 'luxon'

function DisplayAll({logs, isLibrary, handleLike, handleClip, handleDeleteFromLibrary, refreshToggle}) {
    return (
        <table className='tableAll'>
            <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    {!isLibrary && <th>Review</th>}
                    <th>Name</th>
                    {!isLibrary && <th>Date</th>}
                    {!isLibrary && <th>Likes</th>}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {logs? (logs.map((log, idx) => ( 
                    <tr key={idx}>
                        <td>{log.bookTitle}</td>
                        <td>{log.writerName}</td>
                        {!isLibrary && <td>{log.review}</td>}
                        <td>{log.userId.firstName} {log.userId.lastName}</td>
                        {!isLibrary && <td>{DateTime.fromISO(log.reviewDate).toLocaleString(DateTime.DATETIME_SHORT)}</td>}
                        {!isLibrary && <td>{log.likes}</td>}

                        <td>{isLibrary?
                            (
                            <button onClick={()=>handleDeleteFromLibrary(idx, log._id)}>Delete</button>)
                            :(log.userId._id === localStorage.getItem("userId")?
                                (<><button className="btnEdit" onClick={()=>navigate(`/logs/${log._id}/edit`)}>Edit</button>
                                <DeleteLog log={log}/></>)
                                :(<><button onClick={(e)=>handleLike(e, log._id, idx)}>Like</button>
                                <button onClick={(e)=>handleClip(e, log._id)}>Clip</button></>)
                            )}
                        </td>
                    </tr>
                ))): <tr><td>No logs available now</td></tr>}
            </tbody>
        </table>
    )
}
export default DisplayAll
/*
<td>{isLibrary?
                            (<><button className="btnEdit" onClick={()=>navigate(`/logs/${log._id}/edit`)}>Edit</button>
                            <DeleteLog log={log}/></>)
                            :(log.userId === localStorage.getItem("userId")?
                                (<><button className="btnEdit" onClick={()=>navigate(`/logs/${log._id}/edit`)}>Edit</button>
                                <DeleteLog log={log}/></>)
                                :(<><button onClick={(e)=>handleLike(e, log._id, idx)}>Like</button>
                                <button onClick={(e)=>handleClip(e, log._id)}>Clip</button></>)
                            )}
                        </td>
                        */