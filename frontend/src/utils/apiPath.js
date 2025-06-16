export const BASE_URL = process.env.REACT_APP_BASE_URL 
export const API_PATHS = {
  AUTH: {
    LOGIN :"/api/auth/login",
    SIGNUP: "/api/auth/signup",
    GET_USER: "/api/auth/getuser"
  },
    INCOME: {
        GET_INCOME: "/api/income/get",
        ADD_INCOME: "/api/income/add",
        DELETE_INCOME: (id) => `/api/income/delete/${id}`,
        DOWNLOAD_EXCEL: "/api/income/download",
    },
    EXPENSE: {
        GET_EXPENSE: "/api/expense/get",
        ADD_EXPENSE: "/api/expense/add",
        DELETE_EXPENSE: (id) =>`/api/expense/delete/${id}`,
        DOWNLOAD_EXCEL: "/api/expense/download"
    },
    DASHBOARD: {
        GET_DATA: "/api/dashboard",
    },
    IMAGE:{
      UPLOAD_IMAGE:'/api/auth/upload-image'
    }
};