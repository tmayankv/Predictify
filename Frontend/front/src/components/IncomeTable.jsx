import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Page, Selection, Sort, Filter, Toolbar, Inject } from '@syncfusion/ej2-react-grids';

const customerGridRecurring = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.Recurring ==="True" ? '#8BE78B': '#b91c1c' }} className="rounded-full h-3 w-3" />
    <p>{props.Recurring}</p>
  </div>
);

export const customersGrid = [
  { type: 'checkbox', width: '50' },
  { field: 'Source', headerText: 'Source', width: '150', textAlign: 'Center' },
  { field: 'Recurring', headerText: 'Recurring', width: '130', format: 'yMd', textAlign: 'Center', template: customerGridRecurring },
  { field: 'Amount', headerText: 'Amount', width: '100', format: 'yMd', textAlign: 'Center' },
  { field: 'Date', headerText: 'Date', width: '150', textAlign: 'Center' },
  { field: 'ActionID', headerText: 'ActionID', width: '120', textAlign: 'Center', isPrimaryKey: true },
];

export const customersData = [
  {
    ActionID: 1001,
    Source: 'Nirav Joshi',
    Recurring: 'False',
    Date: new Date().toDateString(),
    Amount: 'Rs 2.4k',
  },
  {
    ActionID: 1002,
    Source: 'Sunil Joshi',
    CustomerEmail: 'sunil@gmail.com',
    Recurring: 'True',
    Date: new Date().toDateString(),
    Amount: 'Rs 3.9k',
  },
];

function IncomeTable() {
  const handleActionComplete = (args) => {
    if (args.requestType === 'delete') {
      console.log('deleted');
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 rounded-3xl"  style={{ background: 'linear-gradient(to right, rgb(0,185,222,0.3), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <h1 className="text-3xl font-semibold text-white italic text-center mb-2">
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
