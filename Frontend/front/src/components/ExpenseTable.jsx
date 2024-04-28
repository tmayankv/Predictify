import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Page, Selection, Sort, Filter, Toolbar, Inject } from '@syncfusion/ej2-react-grids';


// const customerGridRecurring = (props) => (
//   <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
//     <p style={{ background: props.Recurring === "Yes" ? '#8BE78B' : '#b91c1c' }} className="rounded-full h-3 w-3" />
//     <p>{props.Recurring}</p>
//   </div>
// );

const customersGrid = [
  { type: 'checkbox', width: '50' },
  { field: 'Category', headerText: 'Category', width: '150', textAlign: 'Center' },
  { field: 'ExpenseName', headerText: 'Expense Name', width: '130', format: 'yMd', textAlign: 'Center' },
  { field: 'Amount', headerText: 'Amount', width: '100', format: 'yMd', textAlign: 'Center' },
  { field: 'Date', headerText: 'Date', width: '150', textAlign: 'Center' },
  { field: 'ActionID', headerText: 'ActionID', width: '120', textAlign: 'Center', isPrimaryKey: true },
];

function ExpenseTable({valid}) { 
  const [expenseData, setExpenseData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [valid]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/exp/${localStorage.getItem('username')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch income data');
      }
      const data = await response.json();
      setExpenseData(data);
      console.log(data);
    } catch (error) {
        console.error('Error fetching income data:', error);
    }
};
  
  const handleActionComplete = async (args) => {
    console.log(args)
    if (args.requestType === 'delete') {
      try {
        const response = await fetch(`/api/exp/${args.data[0].id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete income data');
        }
        console.log()
        fetchData(); // Fetch updated data after successful deletion
        console.log('Income deleted successfully');
      } catch (error) {
        console.error('Error deleting income data:', error);
      }
    }
  };
  

  useEffect(() => {
    if (expenseData && expenseData.user_expense) {
      const formattedData = expenseData.user_expense.map((ele, i) => ({
        ...ele,
        ActionID: i + 1,
        Date: new Date(ele.year,ele.month-1,ele.day).toDateString(),
        Amount: `Rs ${ele.amount}`,
        Category: ele.category,
        ExpenseName: ele.name,
      }));
      setTableData(formattedData);
      console.log(formattedData);
    }
  }, [expenseData]);
  console.log(tableData);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 rounded-3xl" style={{ background: 'linear-gradient(to top, rgb(60,-50,242,0.4), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <h1 className="text-3xl font-semibold text-white italic text-center mb-2">YOUR EXPENSES:</h1>
      <GridComponent
        id="gridComp"
        dataSource={tableData} // Use tableData as the data source
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        actionComplete={handleActionComplete} // Add actionComplete event handler
      >
        <ColumnsDirective>
          {customersGrid.map((item, i) => (
            <ColumnDirective
              key={i}
              type={item.type}
              field={item.field}
              headerText={item.headerText}
              template={item.template}
              width={item.width}
              textAlign={item.textAlign}
              format={item.format}
              isPrimaryKey={item.isPrimaryKey}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Edit, Selection, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default ExpenseTable;
