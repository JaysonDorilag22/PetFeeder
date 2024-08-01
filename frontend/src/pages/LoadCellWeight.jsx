import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './LoadCellWeight.css'; // Import the CSS for styling

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function LoadCellWeight() {
  const [loadCellWeightData, setLoadCellWeightData] = useState([]);
  const [latestWeight, setLatestWeight] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/loadcell-data');
        const rawData = response.data;
        setLoadCellWeightData(rawData);

        if (rawData.length > 0) {
          setLatestWeight(rawData[0].weightScale);

          const timestamps = rawData.map(data => new Date(data.timestamp).toLocaleTimeString());
          const weightValues = rawData.map(data => data.weightScale);

          setChartData({
            labels: timestamps,
            datasets: [
              {
                label: 'Weight (kg)',
                data: weightValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgb(243, 248, 255)',
                fill: true,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching load cell weight data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className='mt-5'>
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-black mb-4">Load Cell Weight Data</h2>

          <div className="flex items-center justify-center mb-5">
            <div className="digital-display">
              <div className="digit">{latestWeight !== null ? `${latestWeight.toFixed(2)}` : 'Loading...'} kg</div>
            </div>
          </div>

          {chartData && (
            <div className="mb-5">
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Weight Over Time',
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Timestamp',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Weight (kg)',
                      },
                      min: -1, // Adjust according to your data range
                      max: 2, // Adjust according to your data range
                    },
                  },
                }} 
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <div className="bg-white rounded-xl shadow-md">
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-gray-400">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loadCellWeightData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(data.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.weightScale} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadCellWeight;
