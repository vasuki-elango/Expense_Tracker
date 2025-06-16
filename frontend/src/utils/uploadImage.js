import { API_PATHS } from "./apiPath"
import axiosInstance from "./axiosInstances"

const uploadImage = async (imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile, imageFile.name)

    try {
        const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }
    catch (err) {
        console.error(err)
    }
}

export default uploadImage