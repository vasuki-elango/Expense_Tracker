import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import axiosInstance from '../utils/axiosInstances'
import { API_PATHS } from "../utils/apiPath"

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER)

                if (isMounted && res.data) {
                    updateUser(res.data)
                }
            }
            catch (err) {
                console.error("Failed to fetch")
                if (isMounted) {
                    clearUser();
                    navigate('/login')
                }
            }
        }

        fetchUserInfo();

        return () => {
            isMounted = false
        }

    }, [user, updateUser, clearUser, navigate])


}
