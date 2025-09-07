import * as S from './styled';
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
import GraphicFilters from '@components/PropertiesGraphic/GraphicFilters';
import {$graphic} from '@models/propertiesGraphic';
import {useUnit} from 'effector-react';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import i18n from 'i18next';
import {NameType, ValueType} from 'recharts/types/component/DefaultTooltipContent';

export default function PropertiesGraphic() {
  const {
    points,
    selectedProperty,
    variableParameter,
    fixedParameter,
    fixedParameterValues,
    loading,
    error,
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
              {`${selectedProperty} (при ${fixedParameter}=${fixedParameterValues[entry.dataKey]}): ${Number(entry.value).toFixed(5)}`}
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
    <S.MainContainer>
      <GraphicFilters />
      {error && (<S.Error>{error.msg[`${i18n.language}`]}</S.Error>)}
      {points.length > 0 && (
        <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
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
              <YAxis label={{value: `${selectedProperty}`, position: 'insideTopLeft'}} />
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
        </Spin>
      )}
    </S.MainContainer>
  );
}
