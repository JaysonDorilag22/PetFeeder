import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LoadCell() {
  const [loadCellData, setLoadCellData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [latestWeight, setLatestWeight] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.98.99:3001/api/loadcell-food-data');
      const data = response.data;

      // Extract and sort the data (latest first)
      const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setLoadCellData(sortedData);

      const timestamps = sortedData.map(data => new Date(data.timestamp).toLocaleTimeString());
      const weights = sortedData.map(data => data.weight);

      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: 'Food Weight',
            data: weights,
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });

      if (sortedData.length > 0) {
        setLatestWeight(sortedData[0].weight); // Latest data
      }
    } catch (error) {
      console.error('Error fetching load cell data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const calculateCircleSize = (weight) => {
    // Adjust this calculation as needed for the size of the circle
    return Math.min(100, weight); // Example: max size is 100
  };

  return (
    <div className='mt-5'>
      <div className="max-w-4xl mx-auto bg-slate-50 rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-black mb-4">Load Cell Data</h2>
          
          {/* Food Bowl Visualization */}
          <div className="flex justify-center mb-5">
            <div className="relative w-64 h-64 bg-gray-200 rounded-full border-4 border-gray-400 flex items-center justify-center overflow-hidden">
              <div
                className="absolute rounded-full bg-yellow-500 transition-all duration-500 ease-in-out"
                style={{
                  width: `${calculateCircleSize(latestWeight)}px`,
                  height: `${calculateCircleSize(latestWeight)}px`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
                {latestWeight} grams
              </div>
            </div>
          </div>

          {/* Line Chart */}
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
                      text: 'Food Weight Over Time',
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
                        text: 'Weight (grams)',
                      },
                    },
                  },
                }} 
              />
            </div>
          )}
          
          {/* Data Table */}
          <div className="overflow-x-auto">
            <div className="bg-white rounded-xl shadow-md">
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-red-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loadCellData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(data.timestamp).toLocaleTimeString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.weight} grams</td>
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

export default LoadCell;
