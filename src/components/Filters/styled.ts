import styled from 'styled-components';

export const FiltersContainer = styled.div`
  min-width: 710px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 800px) {
    min-width: auto;
  }
`;

export const Filters = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 30% 1fr;
  gap: 16px;
  @media (max-width: 800px) {
    grid-template-columns: 100%;
  }
`;
