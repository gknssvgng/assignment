import React from 'react';
import { Pie } from 'react-chartjs-2';

function MyPieChart({ data }) {
    const chartData = {
        labels: data.map(item => item.type),
        datasets: [
            {
                label: 'Population Count',
                data: data.map(item => item.count),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} />;
}

export default MyPieChart;
