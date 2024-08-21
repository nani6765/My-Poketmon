import { useSelector } from 'react-redux';
import { Card } from '../component/Card';

export default function Main() {
  const pokemonData = useSelector((state) => state.pokemon);

  /**
   * pokemonData는 data array와 isLoading을 가지고 있는 object입니다.
   * 고로 우리의 어플리케이션이 생성되고 종료될 때까지 false인 순간은 없습니다.
   * 또한 쿼리의 설계상 하단의 if문에선 isLoading을 사용하는게 더 적절해 보이네요.
   * isLoading이 true이고 data가 없다면 에러페이지를 만들어 보여준다면 더욱 좋겠죠.
   */
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
