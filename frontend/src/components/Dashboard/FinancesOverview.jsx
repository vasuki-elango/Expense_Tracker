import { PieChart } from "../chart/PieChart"

export const FinancesOverview = ({totalamount,totalincome,totalexpense}) => {
    const Colors = ["orange","#a17bf1","red"]
    const Datas = [
        {name:"Total Balance",amount:totalamount},
        {name:"Total Income",amount:totalincome},
        {name:"Total Expense",amount:totalexpense},
    ]
    return (
    <div className='card'>
        <div className='text-center '>
            <h3>FinancesOverview</h3>
        </div>
        <PieChart
            data={Datas}
            label="Total Balance"
            totalIncome={totalamount||0}
            color={Colors}
            showTextAnchar={true}
        />
    </div>
  )
}
