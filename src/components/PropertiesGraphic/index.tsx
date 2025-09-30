import * as S from './styled';
import GraphicFilters from '@components/PropertiesGraphic/GraphicFilters';
import {$graphic} from '@models/propertiesGraphic';
import {useUnit} from 'effector-react';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin} from 'antd';
import i18n from 'i18next';
import Graphic from '@components/PropertiesGraphic/Graphic';

export default function PropertiesGraphic() {
  const {
    points,
    loading,
    error,
  } = useUnit($graphic);

  return (
    <S.MainContainer>
      <GraphicFilters />
      {error && (<S.Error>{error.msg[`${i18n.language}`]}</S.Error>)}
      {points && (
        <Spin indicator={<LoadingOutlined spin />} spinning={loading}>
          {Object.keys(points).map((prop) => (
            <Graphic key={prop} points={points[prop]} property={prop} />
          ))}
        </Spin>
      )}
    </S.MainContainer>
  );
}
