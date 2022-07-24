import {Doughnut} from 'react-chartjs-2'
import React, {FC} from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    BarElement,
    Legend,
    ChartData,
    ArcElement
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
    );

interface Props {
    data: ChartData<"doughnut", number[], string>,
    options?: {}
}

const DougnutChart:FC<Props> = ({data, options}) => {
  return (
    <Doughnut data={data} options={options} />
  )
}

export default DougnutChart