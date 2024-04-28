import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Inject, DateTime, Tooltip, Legend, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

const Area = ({Data1,Data2}) => {

  const onChartLoad = (args) => {
    let chart = document.getElementById('charts');
    chart.setAttribute('title', '');
  };

  const load = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
  };
  // console.log(data1, data2);

  return (
    <div className="flex items-center justify-center p-2 w-full rounded-lg" style={{ background: 'linear-gradient(to top, rgb(2, 0, 94, 0.5), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <ChartComponent
        id="charts"
        className="min-[390px]:w-[85%] max-[1200px]:w-[88%] max-[225px]:w-[65%]"
        height="80%"
        style={{ textAlign: 'center', color: 'white' }}
        primaryXAxis={{
          valueType: 'DateTime',
          labelFormat: 'y',
          majorGridLines: { width: 0 },
          intervalType: 'Years',
          edgeLabelPlacement: 'Shift',
          labelStyle: { color: 'white' } 
        }}
        primaryYAxis={{
          labelFormat: 'Rs {value}',
          lineStyle: { width: 0 },
          interval: 100,
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          maximum: 1000, // Adjust the maximum value as needed
          labelStyle: { color: 'white' } 
        }}
        load={load}
        width={Browser.isDevice ? '100%' : '85%'}
        legendSettings={{ enableHighlight: true }}
        chartArea={{ border: { width: 0 } }}
        title="Inflation Rate in Percentage"
        loaded={onChartLoad}
        tooltip={{ enable: true }}
      >
        <Inject services={[SplineAreaSeries, DateTime, Tooltip, Legend, Highlight]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={Data1}
            xName="x"
            yName="y"
            name="Income"
            marker={{ visible: true, isFilled: true, height: 0, width: 0, shape: 'Circle' }}
            opacity={0.4}
            type="SplineArea"
            width={2}
            fill='#418cfc'
            border={{ width: 4, color: '#418cfc' }}
          />
           <SeriesDirective
            dataSource={Data2}
            xName="x"
            yName="y"
            name="Expense"
            marker={{ visible: true, isFilled: true, height: 0, width: 0, shape: 'Circle' }}
            opacity={0.3}
            type="SplineArea"
            width={2}
            fill="#16a34a"
            border={{ width: 4, color: '#16a34a' }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Area;
