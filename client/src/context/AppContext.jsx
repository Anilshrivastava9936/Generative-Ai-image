import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(false)
    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } })
            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } })
            // console.log("data context", data)
            if (data.success) {

                loadCreditsData()
                // console.log("context image generate", data.resultImage)
                return data.resultImage
            } else {
                toast.error(data.message)
                loadCreditsData()
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)

    }


    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, credit, setCredit, token, setToken, loadCreditsData
        , logout, generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;


// import { createContext, useState } from "react";
// export  const AppContext=createContext();

// const AppContextProvider=(props)=>{
//     const [user,setUser]= useState(true)

//     const value={
//         user,setUser
//     }
// return (
//     <AppContext.Provider value={value}>
//         {props.children}
//     </AppContext.Provider>
// )
// }

// export default AppContextProvider