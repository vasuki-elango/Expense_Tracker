import { useEffect, useState } from 'react'
import { Dashboardlayout } from '../../components/layouts/Dashboardlayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstances'
import { API_PATHS } from '../../utils/apiPath'
import { InfoCard } from '../../components/cards/InfoCard'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import { IoMdCard } from 'react-icons/io'
import { RecentTransactions } from '../../components/Dashboard/RecentTransactions'
import { useNavigate } from 'react-router-dom'
import { FinancesOverview } from '../../components/Dashboard/FinancesOverview'
import { Last30daysExpense } from '../../components/Dashboard/Last30daysExpense'
import { Last30daysIncome } from '../../components/Dashboard/Last30daysIncome'
import { TransactionCard } from '../../components/Dashboard/TransactionCard'

export const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [dashboardData, setdashboardData] = useState(null)
  useUserAuth();

  const fetchDashboardData = async () => {
    if (loading) return

    setLoading(true)
    try {
      const res = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
      setdashboardData(res.data)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <Dashboardlayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            title="Total Amount"
            value={dashboardData?.totalamount || 0}
            icon={<IoMdCard />}
            color="bg-violet-800"
          />
          <InfoCard
            title="Total Income"
            value={dashboardData?.totalIncome || 0}
            icon={<LuWalletMinimal />}
            color="bg-orange-500"
          />
          <InfoCard
            title="Total Expense"
            value={dashboardData?.totalExpenses || 0}
            icon={<LuHandCoins />}
            color="bg-red-500"
          />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          
          <RecentTransactions
            transactions={dashboardData?.RecentTranscation || 0}
            onSeeMore={() => navigate('/expense')}
          />
          
          <FinancesOverview
            totalamount={dashboardData?.totalamount || 0}
            totalincome={dashboardData?.totalIncome || 0}
            totalexpense={dashboardData?.totalExpenses || 0}
          />
          
          <TransactionCard
            transactions={dashboardData?.last30Daysexpense.transaction || 0}
            onSeeMore={() => navigate('/expense')}
            title="Expense Transactions"
            amount={dashboardData?.last30Daysexpense?.amount || 0 }
          />

          <Last30daysExpense data={dashboardData?.last30Daysexpense.transaction} />

          <Last30daysIncome
            data={dashboardData?.last30Daysincome?.transaction?.slice(0, 4) }
            totalincome={dashboardData?.totalIncome || 0}
          />

          <TransactionCard
            transactions={dashboardData?.last60daysIncome?.transaction?.slice(0, 4) || []}
            onSeeMore={() => navigate('/income')}
            title="Income Transactions"
            amount={dashboardData?.last60daysIncome?.amount || 0 }
          />
        </div>
      </div>
    </Dashboardlayout>
  )
}
