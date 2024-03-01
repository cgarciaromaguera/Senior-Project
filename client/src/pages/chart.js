import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';



const LockdownTypeFearChart = ({data}) => {

  // Format your data to fit into the chart
  const chartData = {
    labels: data.filter(item => item.lockdown_status === 'FULL').map(item => item.date), // Assuming 'date' is the property in your data
    datasets: [
      {
        label: 'Full Lockdown',
        data: data.filter(item => item.lockdown_status === 'FULL').map(item => item.fear_trend), // Assuming 'value' is the float value
        borderColor: 'teal',
        backgroundColor: 'teal',
      },
      {
        label: 'Partial Lockdown',
        data: data.filter(item => item.lockdown_status === 'Partial').map(item => item.fear_trend), // Assuming 'value' is the float value
        borderColor: 'red',
        backgroundColor: 'red',
      }
    ],
    
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom sizing
    plugins: {
      title: {
        display: true,
        text: 'Lockdown Status and Fear Intensity Over Time',
        font: {
          size: 18
        }
      },
      legend: {
        position: 'top', // Adjust legend position
      }


    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Fear Intensity'
        }
      }
    }
  };

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      <Line data={chartData} options={options} height={400} />
    </div>
  );
};



export default LockdownTypeFearChart;