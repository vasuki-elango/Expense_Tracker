import React, { useEffect, useState } from 'react'
import { Dashboardlayout } from '../../components/layouts/Dashboardlayout'
import { ExpenseOverview } from '../../components/Expense/ExpenseOverview'
import axiosInstance from '../../utils/axiosInstances'
import { API_PATHS } from '../../utils/apiPath'
import { ExpenseList } from '../../components/Expense/ExpenseList'
import { AddExpenseForm } from '../../components/Expense/AddExpenseForm'
import { Model } from '../../components/Model'
import { DeleteAlert } from '../../components/DeleteAlert'
import toast from 'react-hot-toast'
import { useUserAuth } from '../../hooks/useUserAuth'

export const Expense = () => {
  useUserAuth()
  const [loading,setLoading] = useState(false)
  const [ExpenseData, setExpenseData] = useState([])
  const [openFormModel, setopenFormModel] = useState(false)
  const [openAlert, setopenAlert] = useState({
    show: false,
    data: null
  })

  const fetchingExpenseData = async () => {
    if(loading) return

    setLoading(true)
    try{
      await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSE}`)
        .then(res => setExpenseData(res.data))
        .catch(err => console.log(err))
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  const handleExpenseData = async (expense) => {
    try{
      await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, expense).then(res => {
        console.log("add suceesfully")
      }).catch(err => toast.error(err.response.data.message))
      fetchingExpenseData()
    }
    catch(err){
      console.log(err)
    }
  }

  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
        .then(res => console.log("Deleted Successfully"))
        .catch(err => { console.log(err) })
      setopenAlert({
        show: false,
        data: null
      })
      toast.success("Deleted Successfully")
      fetchingExpenseData()
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDownloadExpense = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXCEL, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download","expense_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
    catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchingExpenseData();
    return () => { }
  }, [])

  return (
    <Dashboardlayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid  gap-6'>
          <ExpenseOverview transactions={ExpenseData} onExpense={() => setopenFormModel(true)} />
        </div>

        <ExpenseList
          transactions={ExpenseData}
          onDownload={handleDownloadExpense}
          onDelete={(id) => setopenAlert({
            show: true,
            data: id
          })}
        />

      </div>
      <Model isOpen={openFormModel}
        onClose={() => setopenFormModel(false)}
        title="Add Expense"
      >
        <AddExpenseForm AddExpense={handleExpenseData} />
      </Model>

      <Model
        isOpen={openAlert.show}
        onClose={() => setopenAlert({ show: false, data: null })}
        title="Delete Alert">
        <DeleteAlert
          content="Are you sure you want delete this income details"
          onDelete={() => deleteExpense(openAlert.data)}
        />
      </Model>

    </Dashboardlayout>
  )
}
