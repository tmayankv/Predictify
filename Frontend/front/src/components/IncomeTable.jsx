import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Page, Selection, Sort, Filter, Toolbar, Inject } from '@syncfusion/ej2-react-grids';

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
    <p>{props.Status}</p>
  </div>
);

export const customersGrid = [
  { type: 'checkbox', width: '50' },
  { field: 'ProjectName', headerText: 'Project Name', width: '150', textAlign: 'Center' },
  { field: 'Status', headerText: 'Status', width: '130', format: 'yMd', textAlign: 'Center', template: customerGridStatus },
  { field: 'Weeks', headerText: 'Weeks', width: '100', format: 'C2', textAlign: 'Center' },
  { field: 'Budget', headerText: 'Budget', width: '100', format: 'yMd', textAlign: 'Center' },
  { field: 'Location', headerText: 'Location', width: '150', textAlign: 'Center' },
  { field: 'CustomerID', headerText: 'Customer ID', width: '120', textAlign: 'Center', isPrimaryKey: true },
];

export const customersData = [
  {
    CustomerID: 1001,
    CustomerName: 'Nirav Joshi',
    CustomerEmail: 'nirav@gmail.com',
    ProjectName: 'Hosting Press HTML',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '40',
    Budget: '$2.4k',
    Location: 'India',
  },
  {
    CustomerID: 1002,
    CustomerName: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    ProjectName: 'Elite Admin',
    Status: 'Active',
    StatusBg: '#8BE78B',
    Weeks: '11',
    Budget: '$3.9k',
    Location: 'India',
  },
];

function IncomeTable() {
  const handleActionComplete = (args) => {
    if (args.requestType === 'delete') {
      console.log('deleted');
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-3xl font-semibold text-black italic text-center mb-2">
        INCOME DATA:
      </h1>
      <GridComponent
        id="gridComp"
        dataSource={customersData}
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

export default IncomeTable;
