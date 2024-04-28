import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Inject, DateTime, Tooltip, Legend, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

const IncomeChart = () => {
  const [graphData, setGraphData] = useState([]);

  const randomGraphData = [
    { x: new Date(2022, 0, 1), y: 100 },
    { x: new Date(2022, 1, 1), y: 150 },
    { x: new Date(2022, 2, 1), y: 200 },
    { x: new Date(2022, 3, 1), y: 180 },
    { x: new Date(2022, 4, 1), y: 220 },
    { x: new Date(2022, 5, 1), y: 250 },
    { x: new Date(2022, 6, 1), y: 300 },
    { x: new Date(2022, 7, 1), y: 280 },
    { x: new Date(2022, 8, 1), y: 320 },
    { x: new Date(2022, 9, 1), y: 350 },
    { x: new Date(2022, 10, 1), y: 400 },
    { x: new Date(2022, 11, 1), y: 380 },
  ];

  useEffect(() => {
    // Simulating API call by setting randomGraphData as data
    setGraphData(randomGraphData);
  }, []);

  const onChartLoad = (args) => {
    let chart = document.getElementById('charts');
    chart.setAttribute('title', '');
  };

  const load = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
  };

  return (
    <div className="flex items-center justify-center p-2 w-full rounded-lg" style={{ background: 'linear-gradient(to top, rgba(2, 0, 94, 0.5), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <ChartComponent
        id="charts"
        className="min-w-[390px] w-[85%] max-w-[1200px]:w-[88%] max-w-[225px]:w-[65%]"
        height="400"
        primaryXAxis={{
          valueType: 'DateTime',
          majorGridLines: { width: 0 },
          edgeLabelPlacement: 'Shift',
          labelStyle: { color: 'white' } 
        }}
        primaryYAxis={{
          labelFormat: '{value}',
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          labelStyle: { color: 'white' } 
        }}
        load={load}
        legendSettings={{ visible: true }}
        chartArea={{ border: { width: 0 } }}
        title="Money in Rupees"
        loaded={onChartLoad}
        tooltip={{ enable: true }}
      >
        <Inject services={[SplineAreaSeries, DateTime, Tooltip, Legend, Highlight]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={graphData}
            xName="x"
            yName="y"
            name="Expense"
            type="SplineArea"
            width={2}
            fill="#1d4ed8"
            border={{ width: 1, color: '#1d4ed8' }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default IncomeChart;
