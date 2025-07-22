import * as S from './styled';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import GraphicFilters from '@components/PropertiesGraphic/GraphicFilters';
import {$points} from '@models/propertiesGraphic';
import {useUnit} from 'effector-react';

export default function PropertiesGraphic() {
  const points = useUnit($points);

  return (
    <S.MainContainer>
      <GraphicFilters />
      {/*{points.length > 0 && (*/}
        <ResponsiveContainer width='100%' minHeight={300}>
          <LineChart data={points}>
            <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
            <XAxis dataKey='x' />
            <YAxis />
            <Line type='monotone' dataKey='y' stroke='#8884d8' />
          </LineChart>
        </ResponsiveContainer>
      {/*)}*/}
    </S.MainContainer>
  );
}
