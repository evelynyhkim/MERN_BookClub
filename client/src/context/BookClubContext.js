import {createContext, useState} from 'react'

const BookClubContext = createContext()

export default BookClubContext
// export const BookClubContext = createContext()

// export default ({children}) => {
//     const [cets, setCets] = useState(['cet0', 'cet1'])
//     const [errs, setErrs] = useState("err msg goes here")

//     const contextVals = {
//         cets: [cets, setCets],
//         errs: [errs, setErrs]
//     }

//     return <BookClubContext.Provider value={contextVals}>
//         {children}
//     </BookClubContext.Provider>
// }