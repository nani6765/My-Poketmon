import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const CardContainer = styled.section`
  width: 150px;
  height: 200px;
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

  &.loading {
    background: linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%);
    background-size: 200% 100%;
    animation: ${loadingAnimation} 1.5s infinite;
  }
`;

export const Card = ({ pokemon, isLoading }) => {
  const navigate = useNavigate();

  return (
    <CardContainer
      onClick={() => {
        if (!isLoading) {
          navigate(`/detail/${pokemon.id}`);
        }
      }}
      className={isLoading ? 'loading' : ''}
    >
      {pokemon && (
        <>
          <img src={pokemon.front} />
          <div>{pokemon.name}</div>
        </>
      )}
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
  }),
  isLoading: PropTypes.bool.isRequired,
};
