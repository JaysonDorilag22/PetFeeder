import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PhSensor() {
  const [phSensorData, setPhSensorData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [currentPh, setCurrentPh] = useState(7);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ph-data');
      const rawData = response.data;

      // Extract and sort the data (latest first)
      const sortedData = rawData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setPhSensorData(sortedData);

      const timestamps = sortedData.map(data => new Date(data.timestamp).toLocaleTimeString());
      const phValues = sortedData.map(data => data.ph);

      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: 'pH Value',
            data: phValues,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
          },
        ],
      });

      // Update the current pH
      if (sortedData.length > 0) {
        setCurrentPh(sortedData[0].ph); // Latest data
        if (sortedData[0].ph > 8 || sortedData[0].ph < 4) {
          toast.warning('Ph level is not safe!');
        }
      }
    } catch (error) {
      console.error('Error fetching pH sensor data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 2000); // Fetch every 2 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const getPhScaleColor = (ph) => {
    const intPart = Math.floor(ph);
    if (intPart === 0) return 'bg-red-900'; // Battery acid
    if (intPart === 1) return 'bg-red-800'; // Stomach acid
    if (intPart === 2) return 'bg-red-700'; // Vinegar
    if (intPart === 3) return 'bg-orange-700'; // Orange juice
    if (intPart === 4) return 'bg-yellow-700'; // Tomato
    if (intPart === 5) return 'bg-yellow-600'; // Black coffee
    if (intPart === 6) return 'bg-green-800'; // Urine
    if (intPart === 7) return 'bg-green-500'; // Water
    if (intPart === 8) return 'bg-blue-500'; // Seawater
    if (intPart === 9) return 'bg-blue-600'; // Baking soda
    if (intPart === 10) return 'bg-blue-700'; // Indigestion tablet
    return 'bg-gray-400'; // Out of range
  };

  return (
    <div className='mt-5'>
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-slate-50 rounded-xl shadow-md ">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">pH Sensor Data</h2>

          {/* pH Scale */}
          <div className="flex justify-center mb-4 space-x-2">
            {Array.from({ length: 11 }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center text-white font-bold text-xl ${getPhScaleColor(currentPh)} ${Math.floor(currentPh) === i ? 'border-4 border-black' : 'border border-gray-300'} rounded-lg shadow-lg`}
                  title={`pH ${currentPh.toFixed(1)}`}
                >
                  {i}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
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
                      text: 'pH Value Over Time',
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
                        text: 'pH Value',
                      },
                      min: 0,
                      max: 14,
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
                <thead className="bg-slate-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-large text-white uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-center text-xs font-large text-white uppercase tracking-wider">pH Value</th>
                    <th className="px-6 py-3 text-center text-xs font-large text-white uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-center text-xs font-large text-white uppercase tracking-wider">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {phSensorData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(data.timestamp).toLocaleTimeString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.ph.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.unit}</td>
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

export default PhSensor;
