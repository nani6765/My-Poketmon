import React, { useCallback, useEffect, useState } from 'react';
import { fetchMultiplePokemonById } from '@/RTK/thunk';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../component/Card';

export default function Main() {
  const dispatch = useDispatch();
  const { ref: bottom, inView } = useInView({
    threshold: 0,
  });
  const [page, setPage] = useState(0);
  const {
    loading,
    data: pokemonData,
    placeholders,
  } = useSelector((state) => state.pokemon);

  const callNextPage = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchMultiplePokemonById(nextPage));
  }, [dispatch, page]);

  useEffect(() => {
    if (!loading && inView) {
      callNextPage();
    }
  }, [callNextPage, dispatch, inView, loading]);

  return (
    <React.Fragment>
      {pokemonData &&
        pokemonData.map((el) => (
          <Card key={el.id} pokemon={el} isLoading={false} />
        ))}

      {/* 로딩 중일 때 빈 카드 컴포넌트들을 렌더링 */}
      {Array.from({ length: placeholders }).map((_, index) => (
        <Card key={`placeholder-${index}`} isLoading={true} />
      ))}

      <div ref={bottom} />
    </React.Fragment>
  );
}
