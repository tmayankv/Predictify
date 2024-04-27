import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, Inject, Tooltip, Legend, Category, DataLabel } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

const IncomeChart = ({ incomeData }) => {
  const barPrimaryXAxis = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
    labelStyle: { color: 'white' },
    labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
    labelRotation: Browser.isDevice ? -45 : 0,
  };

  const barPrimaryYAxis = {
    title: 'Amount',
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: '#f0f9ff' },
    titleStyle: { color: 'white', fontWeight: '100' },
  };

  const barCustomSeries = [
    {
      dataSource: incomeData,
      xName: 'source',
      yName: 'amount',
      type: 'Column',
      columnFacet: 'Cylinder',
      width: 2,
      columnSpacing: 0.1,
      fill: '#2563eb',
      marker: {
        dataLabel: {
          visible: true,
          position: 'Top',
          font: { fontWeight: '400', color: 'white' },
        },
      },
    },
  ];

  return (
    <div className="flex items-center justify-center p-2 w-full rounded-lg text-white" style={{ background: 'linear-gradient(to top, rgb(2, 0, 94, 0.2), rgba(0, 0, 0, 0.4))', backdropFilter: 'blur(10px)' }}>
      <ChartComponent
        className="min-[390px]:w-[85%] max-[1200px]:w-[88%] max-[225px]:w-[65%] "
        id="charts"
        primaryXAxis={barPrimaryXAxis}
        primaryYAxis={barPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        background={''}
        legendSettings={{ background: '#2563eb' }}
      >
        <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
        <SeriesCollectionDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default IncomeChart;
