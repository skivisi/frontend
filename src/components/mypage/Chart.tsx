import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { SkillPoints } from '../../../types/types';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const Chart = ({ skill }: { skill: SkillPoints}) => {
  const chartData: ChartData<'radar'> = {
    labels: [
      'フロントエンド',
      'バックエンド',
      'データベース',
      'サーバーレス',
      '設計',
      'テスト',
      'コミュニケーション',
    ],
    datasets: [
      {
        label: '成熟度',
        data: [
          skill?.FR,
          skill?.BK,
          skill?.DB,
          skill?.SBR,
          skill?.AR,
          skill?.TS,
          skill?.COM,
        ],
        backgroundColor: 'rgba(19, 224, 145, 0.6)',
        borderColor: 'rgba(19, 224, 145, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        min: 1,
        max: 10,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className=" bg-white shadow-md">
      <div
        className=" bg-sky-50"
        style={{ width: '400px', height: '400px' }}
      >
        <Radar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
