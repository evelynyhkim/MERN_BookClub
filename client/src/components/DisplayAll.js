import React, {useEffect, useState, useContext} from "react"
import {navigate, Link} from '@reach/router'
import DeleteLog from "./DeleteLog"
import {DateTime} from 'luxon'

function DisplayAll({logs, handleLike}) {
    return (
        <table className='tableAll'>
            <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Review</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {logs? (logs.map((log, idx) => ( 
                    <tr key={idx}>
                        <td>{log.bookTitle}</td>
                        <td>{log.writerName}</td>
                        <td>{log.review}</td>
                        <td>{log.userId}</td>
                        <td>{DateTime.fromISO(log.reviewDate).toLocaleString(DateTime.DATETIME_SHORT)}</td>
                        <td>
                            {log.userId === localStorage.getItem("userId")?
                                (<><button className="btnEdit" onClick={()=>navigate(`/logs/${log._id}/edit`)}>Edit</button>
                                <DeleteLog log={log}/></>)
                                :(<><button>Like</button>
                                <button>Clip</button></>)
                            }
                        </td>
                    </tr>
                ))): <tr><td>No logs available now</td></tr>}
            </tbody>
        </table>
    )
}
export default DisplayAll