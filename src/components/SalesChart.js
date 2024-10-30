import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const SalesChart = () => {
    const data = {
        labels: [
            '20/6/2024',
            '22/6/2024',
            '23/6/2024',
            '24/6/2024',
            '22/10/2024',
        ],
        datasets: [
            {
                label: 'Sales (VNĐ)',
                data: [200000, 180000, 400000, 100000, 150000],
                borderColor: '#6366F1', // màu của đường biểu đồ
                backgroundColor: 'rgba(99, 102, 241, 0.2)', // màu nền dưới đường biểu đồ
                pointBackgroundColor: '#6366F1',
                fill: false,
                tension: 0.4, // bo tròn góc
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // ẩn tên biểu đồ
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                },
            },
        },
    };

    return (
        <div className='w-full bg-white shadow-sm rounded-lg p-4 border border-gray-200'>
            <h2 className='text-lg font-semibold mb-4'>Sales Chart (VNĐ)</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default SalesChart;
