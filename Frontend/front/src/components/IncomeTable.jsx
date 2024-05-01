import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Page, Selection, Sort, Filter, Toolbar, Inject } from '@syncfusion/ej2-react-grids';
const customerGridRecurring = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.Recurring === "Yes" ? '#8BE78B' : '#b91c1c' }} className="rounded-full h-3 w-3" />
    <p>{props.Recurring}</p>
  </div>
);
const customersGrid = [
  { type: 'checkbox', width: '50' },
  { field: 'Source', headerText: 'Source', width: '150', textAlign: 'Center' },
  { field: 'Recurring', headerText: 'Recurring', width: '130', format: 'yMd', textAlign: 'Center', template: customerGridRecurring },
  { field: 'Amount', headerText: 'Amount', width: '100', format: 'yMd', textAlign: 'Center' },
  { field: 'Date', headerText: 'Date', width: '150', textAlign: 'Center' },
  { field: 'ActionID', headerText: 'ActionID', width: '120', textAlign: 'Center', isPrimaryKey: true },
];
function IncomeTable({valid}) { 
  const [incomeData, setIncomeData] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [valid]);
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/income/${localStorage.getItem('username')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch income data');
      }
      const data = await response.json();
      setIncomeData(data);
    } catch (error) {
        console.error('Error fetching income data:', error);
    }
};
  const handleActionComplete = async (args) => {
    if (args.requestType === 'delete') {
      try {
        const response = await fetch(`/api/income/${args.data[0].id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete income data');
        }
        fetchData();
      } catch (error) {
        console.error('Error deleting income data:', error);
      }
    }
  };
  useEffect(() => {
    if (incomeData && incomeData.user_income) {
      const formattedData = incomeData.user_income.map((ele, i) => ({
        ...ele,
        ActionID: i + 1,
        Date: new Date(ele.year,ele.month-1,ele.day).toDateString(),
        Amount: `Rs ${ele.amount}`,
        Recurring: ele.recurring? "Yes" : "No",
        Source: ele.source,
      }));
      setTableData(formattedData);
    }
  }, [incomeData]);
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 rounded-3xl w-[81vw]"  >
      <h1 className="text-2xl font-semibold text-white text-center mb-4">INCOME DATA</h1>
      <GridComponent
        id="gridComp"
        dataSource={tableData}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        actionComplete={handleActionComplete}
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

export default IncomeTable;
