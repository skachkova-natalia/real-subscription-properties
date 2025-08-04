import * as S from './styled';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import GraphicFilters from '@components/PropertiesGraphic/GraphicFilters';
import {$graphic} from '@models/propertiesGraphic';
import {useUnit} from 'effector-react';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import i18n from 'i18next';

export default function PropertiesGraphic() {
  const {points, loading, error} = useUnit($graphic);
  console.log(points);
  return (
    <S.MainContainer>
      <GraphicFilters />
      {error && (<S.Error>{error.msg[`${i18n.language}`]}</S.Error>)}
      {points.length > 0 && (
        <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
          <ResponsiveContainer width='100%' minHeight={300}>
            <LineChart data={points}>
              <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
              <XAxis dataKey='x' />
              <YAxis />
              <Line type='monotone' dataKey='y' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        </Spin>
      )}
    </S.MainContainer>
  );
}
