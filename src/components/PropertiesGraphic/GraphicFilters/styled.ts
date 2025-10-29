import styled from 'styled-components';
import {Button, Form, Typography} from 'antd';
import {breakpoint, color} from '@src/theme';

export const StyledForm = styled(Form)`
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  background-color: ${color.primary.s20};
  border: 1px solid ${color.primary.s100};
  border-radius: 5px;

  @media (max-width: ${breakpoint.laptop}) {
    padding: 16px 8px;
    gap: 8px;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .form-item {
    margin: 0;
  }

  @media (max-width: ${breakpoint.laptop}) {
    gap: 8px;
  }
}
`;

export const GroupLabel = styled(Typography)`
  position: absolute;
  top: -12px;
  padding: 0 8px;
  margin: 0;
  background: ${color.primary.s20};
  color: ${color.base.s600};
`;

export const Parameters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ParametersContainer = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: ${breakpoint.laptop}) {
    padding: 0 8px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const SubmitButton = styled(Button)`
  margin: 8px;
  background-color: ${color.primary.s700};
`;

export const ShareButton = styled(Button)`
  display: none;
  
  @media (max-width: ${breakpoint.mobile}) {
    display: block;
  }
`;
