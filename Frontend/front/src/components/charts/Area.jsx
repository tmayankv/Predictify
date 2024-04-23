Responsi
  
  const areaChartData = [
    [
      { x: new Date(2002, 0, 1), y: 2.2 },
      { x: new Date(2003, 0, 1), y: 3.4 },
      { x: new Date(2004, 0, 1), y: 2.8 },
      { x: new Date(2005, 0, 1), y: 1.6 },
      { x: new Date(2006, 0, 1), y: 2.3 },
      { x: new Date(2007, 0, 1), y: 2.5 },
      { x: new Date(2008, 0, 1), y: 2.9 },
      { x: new Date(2009, 0, 1), y: 3.8 },
      { x: new Date(2010, 0, 1), y: 1.4 },
      { x: new Date(2011, 0, 1), y: 3.1 },
    ],
   
  ];
  
  export const areaCustomSeries = [
    {
      dataSource: areaChartData[0],
      xName: 'x',
      yName: 'y',
      name: 'Income',
      opacity: '0.5',
      type: 'SplineArea',
      width: '150',
      fill:"blueviolet",
      color:"white",
  
    },
   
  ];
  
  export const areaPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'y',
    interval:3,
    majorGridLines: { width: 2 },
    intervalType: 'Years',
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'white' },
  };
  
  export const areaPrimaryYAxis = {
    labelFormat: '{value}%',
    lineStyle: { width: 2 },
    maximum: 4,
    interval: 2,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelStyle: { color: 'white' },
  
    
  
  };
  function Area() {
    return (
      <ResponsiveContainer width="100%" height={400}>
 <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
    </ResponsiveContainer>
    );
  }
  export default Area;
  