import {Bar} from 'react-chartjs-2'
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
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

interface Props {
    data: ChartData<"bar", number[], string>,
    options?: {}
}

const BarChart:FC<Props> = ({data, options}) => {
  return (
    <Bar data={data} options={{
      plugins: {
        legend:{
          display: false,
        }
      }
    }} />
  )
}

export default BarChart