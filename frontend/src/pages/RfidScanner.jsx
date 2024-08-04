import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaCat, FaDog } from "react-icons/fa"; // Import the cat and dog icons

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const catImage = "https://fathead.com/cdn/shop/products/mz3n0fid0kt4hs7fesr8.jpg?v=1648638290&width=1946";
const dogImage = "https://img.freepik.com/free-photo/pug-dog-isolated-white-background_2829-11406.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722643200&semt=ais_hybrid";

function RfidScanner() {
  const [rfidData, setRfidData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [summaryData, setSummaryData] = useState({
    ph: null,
    waterLevel: null,
    catWeight: null,
    foodLevel: null,
    drinkFrequency: 0,
    eatFrequency: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          rfidResponse,
          phResponse,
          waterLevelResponse,
          loadCellWeightResponse,
          loadCellFoodResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3001/api/rfid-data"),
          axios.get("http://localhost:3001/api/ph-data"),
          axios.get("http://localhost:3001/api/waterlevel-data"),
          axios.get("http://localhost:3001/api/loadcell-data"),
          axios.get("http://localhost:3001/api/foodlevel-data"),
        ]);

        const rawRfidData = rfidResponse.data;
        const rawPhData = phResponse.data;
        const rawWaterLevelData = waterLevelResponse.data;
        const rawLoadCellWeightData = loadCellWeightResponse.data;
        const rawLoadCellFoodData = loadCellFoodResponse.data;

        // Filter RFID data to include only the specified UIDs
        const filteredRfidData = rawRfidData.filter(
          (data) => data.uid === "53:ac:a4:c9" || data.uid === "3:c9:ba:a6"
        );

        // Count occurrences of each UID
        const uidCounts = filteredRfidData.reduce((acc, data) => {
          acc[data.uid] = (acc[data.uid] || 0) + 1;
          return acc;
        }, {});

        // Map UIDs to names and images
        const uidToName = {
          "53:ac:a4:c9": "Pillows",
          "3:c9:ba:a6": "Koshi",
        };

        const uidToImage = {
          "53:ac:a4:c9": dogImage,
          "3:c9:ba:a6": catImage,
        };

        setChartData({
          labels: Object.keys(uidCounts).map(uid => uidToName[uid]),
          datasets: [
            {
              label: "Scan Count",
              data: Object.values(uidCounts),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });

        // Process and summarize other data
        const latestPh = rawPhData.length > 0 ? rawPhData[0].ph : null;
        const latestWaterLevel =
          rawWaterLevelData.length > 0 ? rawWaterLevelData[0].waterLevel : null;
        const latestCatWeight =
          rawLoadCellWeightData.length > 0
            ? rawLoadCellWeightData[0].weightScale
            : null;
        const latestFoodLevel =
          rawLoadCellFoodData.length > 0
            ? rawLoadCellFoodData[0].foodLevel
            : null;

        const drinkFrequency = rawWaterLevelData.length;
        const eatFrequency = rawLoadCellFoodData.length;

        setSummaryData({
          ph: latestPh,
          waterLevel: latestWaterLevel,
          catWeight: latestCatWeight,
          foodLevel: latestFoodLevel,
          drinkFrequency,
          eatFrequency,
        });

        setRfidData(filteredRfidData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleImageDraw = (chart) => {
    const ctx = chart.ctx;
    const { datasets } = chart.data;
    const { height, width } = chart.chartArea;

    // Image URLs
    const images = {
      "53:ac:a4:c9": dogImage,
      "3:c9:ba:a6": catImage,
    };

    Object.keys(images).forEach((uid, index) => {
      const img = new Image();
      img.src = images[uid];
      img.onload = () => {
        const { barThickness, data } = datasets[0];
        const bar = chart.getDatasetMeta(0).data[index];
        const x = bar.x;
        const y = bar.y;
        const barWidth = barThickness || 30;

        // Set image dimensions
        const imageSize = 40; // Square size of the image
        const imageX = x - imageSize / 2;
        const imageY = y - imageSize - 10; // 10px above the bar

        // Draw the image at the position
        ctx.drawImage(img, imageX, imageY, imageSize, imageSize);
      };
    });
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold text-white mb-4">RFID Scanner Data</h2>

      {chartData && (
        <div className="mb-5">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                title: {
                  display: true,
                  text: "RFID Scan Count Per UID",
                },
                // Integrate the image drawing within the plugins configuration
                beforeDraw: (chart) => handleImageDraw(chart),
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Name",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Scan Count",
                  },
                  min: 0,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>
      )}

      {/* Summary Section */}
      <div className="mt-5 bg-white rounded-xl shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaCat className="mr-2 text-gray-600" /> Summary Data
        </h2>
        <ul>
          <li className="mb-2">
            pH Value:{" "}
            {summaryData.ph !== null ? `${summaryData.ph} pH` : "No data"}
          </li>
          <li className="mb-2">
            Water Level:{" "}
            {summaryData.waterLevel !== null
              ? `${summaryData.waterLevel} units`
              : "No data"}
          </li>
          <li className="mb-2">
            Cat Weight:{" "}
            {summaryData.catWeight !== null
              ? `${summaryData.catWeight} kg`
              : "No data"}
          </li>
          <li className="mb-2">
            Food Level:{" "}
            {summaryData.foodLevel !== null
              ? `${summaryData.foodLevel} grams`
              : "No data"}
          </li>
          <li className="mb-2">
            Drink Frequency: {summaryData.drinkFrequency} times
          </li>
          <li className="mb-2">
            Eat Frequency: {summaryData.eatFrequency} times
          </li>
        </ul>
      </div>
      <div className="max-w-4xl mx-auto bg-white-400 rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          {/* Table Section */}
          <div className="overflow-x-auto mb-5">
            <div className="bg-white rounded-xl shadow-md">
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-slate-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">
                      Tag ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rfidData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(data.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.uid}
                      </td>
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

export default RfidScanner;
