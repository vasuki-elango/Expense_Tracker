import { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState("")

    const updateUser = (userData) => {
        setUser(userData)
    }
    const clearUser = () => {
        setUser("")
    }
    return (
        <UserContext.Provider value={{
            user,
            updateUser,
            clearUser
        }}>
            {children}
        </UserContext.Provider>
    )
}
