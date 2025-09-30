import {
  Brush,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from 'recharts';
import {NameType, ValueType} from 'recharts/types/component/DefaultTooltipContent';
import * as S from './styled';
import {useUnit} from 'effector-react';
import {$graphic} from '@models/propertiesGraphic';
import {Point} from '@src/types/graphic';

interface Props {
  property: string;
  points: Point[];
}

export default function Graphic({property, points}: Props) {
  const {
    variableParameter,
    fixedParameter,
    fixedParameterValues,
  } = useUnit($graphic);

  const lineKeys = points.length > 0
    ? Object.keys(points[0]).filter(key => key !== 'x')
    : [];

  const lineColors = ['#0376BE', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#7F7F7F', '#BCBD22', '#17BECF'];

  const customTooltip = ({active, payload, label}: TooltipContentProps<ValueType, NameType>) => {
    if (active && payload?.length) {
      return (
        <S.CustomTooltip>
          {`${variableParameter}: ${label}`}<br />
          {payload.map((entry, index) => (
            <div key={index} style={{color: entry.color}}>
              {`${property} (при ${fixedParameter}=${fixedParameterValues[entry.dataKey]}): ${Number(entry.value).toFixed(5)}`}
            </div>
          ))}
        </S.CustomTooltip>
      );
    }
    return null;
  };

  const formatXAxis = (tickItem) => {
    return Number(tickItem).toFixed(2);
  };

  return (
    <ResponsiveContainer width='100%' minHeight={350}>
      <LineChart data={points} margin={{  right: 10, bottom: 10}}>
        <Legend
          verticalAlign='top'
          height={36}
          formatter={(value) => <span
            style={{color: '#333'}}>{fixedParameter} = {fixedParameterValues[value]}</span>}
        />
        <XAxis
          dataKey='x'
          tickFormatter={formatXAxis}
          label={{value: `${variableParameter}`, position: 'insideBottomRight', offset: -5}}
        />
        <YAxis label={{value: `${property}`, position: 'insideTopLeft'}} />
        {lineKeys.map((key, index) => (
          <Line
            key={key}
            type='monotone'
            dataKey={key}
            stroke={lineColors[index % lineColors.length]}
            dot={false}
            activeDot={{r: 4}}
          />
        ))}
        <Tooltip content={customTooltip} />
        <Brush
          dataKey='x'
          height={1}
          stroke='#0376BE'
          fill='transparent'
          traveller={(props) => {
            const {x, y} = props;
            return (
              <rect
                x={x}
                y={y - 6}
                width={12}
                height={12}
                fill='#0376BE'
                rx={15}
                ry={15}
              />
            );
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
