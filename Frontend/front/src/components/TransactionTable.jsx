import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective,
  ColumnDirective, Toolbar,
  Page, Search, Inject, Sort} from '@syncfusion/ej2-react-grids';
import {  BadgeIndianRupeeIcon, Type } from 'lucide-react';
const gridEmployeeCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
      <BadgeIndianRupeeIcon />
      <span>{props.Amount}</span>
    </div>
  );
  const gridIconChange = (props) =>(
    <div className="flex items-center justify-center gap-2">
    <span className='p-1 px-2 rounded-xl' style={{background: props.Type === 'credit'? "#4ade80":"#f87171"}}>{props.Type}</span>
  </div>
  )
export const employeesGrid = [
    
    { field: 'ID',
      headerText: 'ID',
      width: '125',
      textAlign: 'Center' },
    
      { field: 'cardNumber',
      headerText: 'cardNumber',
      width: '155',
      textAlign: 'Center',
    },
    { field: 'Date',
      headerText: 'Date',
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'Amount',
      width: '120',
      textAlign: 'Center',
      template: gridEmployeeCountry },
    { field: 'Type',
      headerText: 'Type',
      width: '135',
      textAlign: 'Center',
      template: gridIconChange },
  
    { field: 'Balance',
      headerText: 'Balance',
      width: '120',
      textAlign: 'Center' },
  ];
const TransactionTable = ({transaction, title}) => {
    const [Balance, setBalance] = useState(transaction.balance)
    const [cardN, setcardN] = useState(transaction.card_number)
    const [TableData, setTableData] = useState([])
    useEffect(()=>{
            if (transaction && transaction.transaction_history) {
              const formattedData = transaction.transaction_history.map((ele, i) => ({
                ...ele,
                ID: i + 1,
                Date: new Date(ele.timestamp).toDateString(),
                cardNumber: cardN,
                Type: ele.transaction_type,
                Amount: ele.amount,
                Balance: Balance,
              }));
              setTableData(formattedData);
            }
          }, [transaction]);
  return (
    <div className="m-2 text-white md:m-10 p-2 md:p-10 bg-white rounded-3xl" style={{ background: 'linear-gradient(to top, rgba(82, 130, 194, 0.21), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <h1 className="text-center text-2xl max-[400px]:text-lg mb-6 font-bold ">Transaction History of Your Card '{title}'</h1>
      <GridComponent
        id="gridComp"
        dataSource={TableData}
        allowPaging
        allowSorting
        toolbar={['Search']}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, i) => (
            <ColumnDirective
              key={i}
              field={item.field}
              headerText={item.headerText}
              template={item.template}
              width={item.width}
              textAlign={item.textAlign}
              format={item.format}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar,Sort]} />
      </GridComponent>
    </div>
  )
}

export default TransactionTable
