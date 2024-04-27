import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Inject, DateTime, Tooltip, Legend, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

export let data1 = [
  { x: new Date(2002, 0, 1), y: 2.2 },
  { x: new Date(2003, 0, 1), y: 3.4 },
  { x: new Date(2004, 0, 1), y: 2.8 },
  { x: new Date(2005, 0, 1), y: 1.6 },
  { x: new Date(2006, 0, 1), y: 2.3 },
  { x: new Date(2007, 0, 1), y: 2.5 },
  { x: new Date(2008, 0, 1), y: 2.9 },
  { x: new Date(2009, 0, 1), y: 1.1 },
  { x: new Date(2010, 0, 1), y: 1.4 },
  { x: new Date(2011, 0, 1), y: 1.1 }
];

export let data2 = [
  { x: new Date(2002, 0, 1), y: 1.5 },
  { x: new Date(2003, 0, 1), y: 2.8 },
  { x: new Date(2004, 0, 1), y: 1.3 },
  { x: new Date(2005, 0, 1), y: 3.1 },
  { x: new Date(2006, 0, 1), y: 2.6 },
  { x: new Date(2007, 0, 1), y: 1.9 },
  { x: new Date(2008, 0, 1), y: 2.4 },
  { x: new Date(2009, 0, 1), y: 1.8 },
  { x: new Date(2010, 0, 1), y: 1.2 },
  { x: new Date(2011, 0, 1), y: 2.0 }
];


const Area = () => {
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
          minimum: new Date(2002, 0, 1),
          maximum: new Date(2011, 0, 1),
          edgeLabelPlacement: 'Shift',
          labelStyle: { color: 'white' } 
        }}
        primaryYAxis={{
          labelFormat: '{value}%',
          lineStyle: { width: 0 },
          maximum: 4,
          interval: 1,
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          labelStyle: { color: 'white' } 
        }}
        load={load.bind(this)}
        width={Browser.isDevice ? '100%' : '85%'}
        legendSettings={{ enableHighlight: true }}
        chartArea={{ border: { width: 0 } }}
        title="Inflation Rate in Percentage"
        loaded={onChartLoad.bind(this)}
        tooltip={{ enable: true }}
      >
        <Inject services={[SplineAreaSeries, DateTime, Tooltip, Legend, Highlight]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data1}
            xName="x"
            yName="y"
            name="Income"
            marker={{ visible: true, isFilled: true, height: 0, width: 0, shape: 'Circle' }}
            opacity={0.4}
            type="SplineArea"
            width={2}
            fill='#418cfc'
            border={{ width: 4, color: '#418cfc' }} // Set glow effect color here
          />
           <SeriesDirective
            dataSource={data2}
            xName="x"
            yName="y"
            name="Expense"
            marker={{ visible: true, isFilled: true, height: 0, width: 0, shape: 'Circle' }}
            opacity={0.3}
            type="SplineArea"
            width={2}
            fill="#16a34a"
            border={{ width: 4, color: '#16a34a' }} // Set glow effect color here
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Area;
