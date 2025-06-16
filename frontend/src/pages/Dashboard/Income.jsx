import { useEffect, useState } from 'react'
import { Dashboardlayout } from '../../components/layouts/Dashboardlayout'
import { IncomeOverview } from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstances'
import { API_PATHS } from '../../utils/apiPath'
import { Model } from '../../components/Model'
import { AddIncomeForm } from '../../components/Income/AddIncomeForm'
import { Incomelist } from '../../components/Income/Incomelist'
import { DeleteAlert } from '../../components/DeleteAlert'
import { toast } from 'react-hot-toast'
import { useUserAuth } from '../../hooks/useUserAuth'

export const Income = () => {
  useUserAuth()
  const [IncomeData, setIncomeData] = useState([])
  const [loading, setloading] = useState(false)
  const [openFormModel, setopenFormModel] = useState(false)
  const [openAlert, setopenAlert] = useState({
    show: false,
    data: null
  })

  const fetchIncomeData = async () => {
    if (loading) return
    setloading(true)
    try {
      await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOME}`)
        .then(resp => setIncomeData(resp.data))
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setloading(false)
    }
  }

  const handleIncomeData = async (income) => {
    try{
      axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, income).then(res => {
        console.log("add suceesfully")
      }).catch(err => toast.error(err.response.data.message))
      fetchIncomeData()
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
        .then(res => console.log("Deleted Successfully"))
        .catch(err => { console.log(err) })
      setopenAlert({
        show: false,
        data: null
      })
      toast.success("Deleted Successfully")
      fetchIncomeData()
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleDownloadIncome = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_EXCEL, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "income_details.xlsx")
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
    fetchIncomeData();
    return () => { }
  }, [])

  return (
    <Dashboardlayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 '>
          <IncomeOverview transactions={IncomeData} onAddIncome={() => setopenFormModel(true)} />
        </div>

        <Incomelist
          transactions={IncomeData}
          onDownload={handleDownloadIncome}
          onDelete={(id) => setopenAlert({
            show: true,
            data: id
          })}
        />
      </div>

      <Model isOpen={openFormModel}
        onClose={() => setopenFormModel(false)}
        title="Add Income"
      >
        <AddIncomeForm AddIncome={handleIncomeData} />
      </Model>

      <Model
        isOpen={openAlert.show}
        onClose={() => setopenAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want delete this income details"
          onDelete={() => deleteIncome(openAlert.data)}
        />
      </Model>

    </Dashboardlayout>
  )
}
