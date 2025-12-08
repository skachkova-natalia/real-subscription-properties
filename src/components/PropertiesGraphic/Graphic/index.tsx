import {Point} from '@src/types/graphic';
import React, {useMemo} from 'react';
import {Line} from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import {useUnit} from 'effector-react';
import {$filters} from '@models/filters';
import i18n from 'i18next';
import {$graphic} from '@models/propertiesGraphic';
import * as S from './styled';
import ZoomPlugin from 'chartjs-plugin-zoom';

interface Props {
  property: string;
  points: {[key: string]: Point[]};
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ZoomPlugin,
);

const LINE_COLORS = [
  'rgb(59, 130, 246)',
  'rgb(239, 68, 68)',
  'rgb(34, 197, 94)',
  'rgb(168, 85, 247)',
  'rgb(245, 158, 11)',
  'rgb(14, 165, 233)',
  'rgb(249, 115, 22)',
  'rgb(236, 72, 153)',
];

export default function Graphic({property, points}: Props) {
  const {modesParams, propertiesList} = useUnit($filters);
  const {
    fixedParameter,
    variableParameter,
  } = useUnit($graphic);

  const propertyName: string = useMemo(() => {
    const prop = propertiesList.find((prop) => prop.literal === property);
    if (!prop) {
      return property;
    }
    return `${prop.name[`${i18n.language}`]} (${prop.literal})`;
  }, [propertiesList]);

  const variableParameterName: string = useMemo(() => {
    const prop = modesParams.find((prop) => prop.id === variableParameter);
    if (!prop) {
      return variableParameter;
    }
    return `${prop.name[`${i18n.language}`]} (${prop.id})`;
  }, [fixedParameter, variableParameter, modesParams]);

  const chartDatasets = useMemo(() => {
    const fixedParamValues = Object.keys(points);

    return fixedParamValues.map((fixedValue, index) => {
      const dataPoints = points[fixedValue];

      const colorIndex = index % LINE_COLORS.length;
      const borderColor = LINE_COLORS[colorIndex];

      const backgroundColor = borderColor.replace('rgb(', 'rgba(').replace(')', ', 0.1)');
      return {
        label: `${fixedParameter} = ${fixedValue}`,
        data: dataPoints,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      };
    });
  }, [points, fixedParameter]);

  const chartData: ChartData<'line'> = {
    datasets: chartDatasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: 'rgb(203, 213, 225)',
        bodyColor: 'rgb(203, 213, 225)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          title: function(tooltipItems) {
            const item = tooltipItems[0];
            return `${variableParameterName}: ${Number(item.parsed.x).toFixed(5)}`;
          },
          label: function(context) {
            const datasetLabel = context.dataset.label || '';
            const label = `${propertyName} (при ${datasetLabel})`;
            return `${label}: ${Number(context.parsed.y).toFixed(5)}`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        limits: {
          x: {min: 'original', max: 'original'},
          y: {min: 'original', max: 'original'},
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: variableParameterName,
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: propertyName,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    animation: {
      duration: 0,
    },
  };

  if (chartDatasets.length === 0) {
    return (
      <S.GraphicContainer>
        <div>Нет данных для отображения</div>
      </S.GraphicContainer>
    );
  }

  return (
    <S.GraphicContainer>
      <Line data={chartData} options={options} />
    </S.GraphicContainer>
  );
}
