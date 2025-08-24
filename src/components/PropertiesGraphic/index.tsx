import * as S from './styled';
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts';
import GraphicFilters from '@components/PropertiesGraphic/GraphicFilters';
import {$graphic} from '@models/propertiesGraphic';
import {useUnit} from 'effector-react';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin, } from 'antd';
import i18n from 'i18next';

export default function PropertiesGraphic() {
  const {points, selectedProperty, loading, error} = useUnit($graphic);

  return (
    <S.MainContainer>
      <GraphicFilters />
      {error && (<S.Error>{error.msg[`${i18n.language}`]}</S.Error>)}
      {points.length > 0 && (
        <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
          <ResponsiveContainer width='100%' minHeight={300}>
            <LineChart data={points}>
              <XAxis dataKey='x' />
              <YAxis />
              <Tooltip
                formatter={(value) => Number(value).toFixed(6)}
                labelFormatter={(label) => `${selectedProperty}: ${Math.round(label)}`}
              />
              <Line
                type='monotone'
                dataKey='y'
                stroke='#0376BE'
                dot={false}
                activeDot={{ r: 4, fill: '#0376BE' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Spin>
      )}
    </S.MainContainer>
  );
}
