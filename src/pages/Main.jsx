import { useSelector } from 'react-redux';
import { Card } from '../component/Card';

export default function Main() {
  const pokemonData = useSelector((state) => state.pokemon);

  // 데이터가 아직 로드되지 않았을 경우 로딩 상태 보여줌
  if (!pokemonData || !pokemonData.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {pokemonData.data.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </>
  );
}
