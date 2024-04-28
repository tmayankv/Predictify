import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective,
  ColumnDirective, Toolbar,
  Page, Search, Inject } from '@syncfusion/ej2-react-grids';
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
export const employeesData = [
    {
      ID: 1,
      Date: 'Nancy Davolio',
      cardNumber: '1254203256985264',
      Type: 'credit',
      Amount: 1020,
      Balance: 'Carson',
    },
]
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
const TransactionTable = ({transactionHist}) => {
    const [Balance, setBalance] = useState(transactionHist.balance)
    const [cardN, setcardN] = useState(transactionHist.card_number)
    
    const [TableData, setTableData] = useState([])
    
    useEffect(()=>{
            if (transactionHist && transactionHist.transaction_history) {
              const formattedData = transactionHist.transaction_history.map((ele, i) => ({
                ...ele,
                ID: i + 1,
                Date: new Date(ele.timestamp).toDateString(),
                cardNumber: cardN,
                Type: ele.transaction_type,
                Amount: ele.amount,
                Balance: Balance,
              }));
              setTableData(formattedData);
              console.log(formattedData);
            }
          }, [transactionHist]);
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
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
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  )
}

export default TransactionTable
