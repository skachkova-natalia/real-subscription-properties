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
  points: Point[];
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

export default function Graphic({property, points}: Props) {
  const {modesParams, propertiesList} = useUnit($filters);
  const {
    fixedParameter,
    fixedParameterValues,
    variableParameter,
  } = useUnit($graphic);
  const propertyName: string = useMemo(() => {
    const prop = propertiesList.find((prop) => prop.literal === property);
    if (!prop) {
      return property;
    }
    return `${prop.name[`${i18n.language}`]} (${prop.literal})`;
  }, []);

  const variableParameterName: string = useMemo(() => {
    const prop = modesParams.find((prop) => prop.id === variableParameter);
    if (!prop) {
      return variableParameter;
    }
    return `${prop.name[`${i18n.language}`]} (${prop.id})`;
  }, [fixedParameter]);

  const chartData: ChartData<'line'> = {
    datasets: [
      {
        label: `${fixedParameter} = ${fixedParameterValues[property]}`,
        data: points,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderJoinStyle: 'round',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
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

  return (
    <S.GraphicContainer>
      <Line data={chartData} options={options} />
    </S.GraphicContainer>
  );
}
