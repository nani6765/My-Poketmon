import React, { useCallback, useEffect, useState } from 'react';
import { fetchMultiplePokemonById } from '@/RTK/thunk';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../component/Card';

export default function Main() {
  const dispatch = useDispatch();

  // 해당 라이브러리가 무엇을 어떻게 동작하는지는 몰라도 됩니다.
  // ref(bottom)으로 넘겨준 html 태그가 화면에 보인다면 inView의 값은 true, 아니면 false입니다.
  const { ref: bottom, inView } = useInView({
    threshold: 0,
  });
  const [page, setPage] = useState(0);
  const { loading, data: pokemonData } = useSelector((state) => state.pokemon);

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
        pokemonData.map((el) => <Card key={el.id} pokemon={el} />)}
      <div ref={bottom} />
    </React.Fragment>
  );
}
