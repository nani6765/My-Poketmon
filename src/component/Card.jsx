import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.section`
  width: 150px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  // 클릭 시 링크 이동이 됨으로
  cursor: pointer;

  img {
    width: 120px;
  }
`;

export const Card = ({ pokemon }) => {
  const navigate = useNavigate();
  return (
    <CardContainer onClick={() => navigate(`/detail/${pokemon.id}`)}>
      <img src={pokemon.front} />
      <div>{pokemon.name}</div>
    </CardContainer>
  );
};

/**
 * react/prop-types 에러 꼴보기 싫어서 넣었습니다.
 * 무시하세요.
 */
Card.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    front: PropTypes.string.isRequired,
    back: PropTypes.string,
  }).isRequired,
};
