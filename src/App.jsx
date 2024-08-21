import { useEffect } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import { fetchMultiplePokemonById } from './RTK/thunk';
import { Link, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Favorite from './pages/Favorite';

function App() {
  const dispatch = useDispatch();

  /**
   * 해당 코드가 App.jsx에 존재해야 하는지 의심해봐야 합니다.
   * 이 코드의 역할은 1세대 포켓몬 151마리를 부르는 API를 호출하는 역할입니다.
   * 해당 목록이 필요한 페이지는 Main Route(path : /) 한 곳입니다.
   * 조금 더 적절한 위치로 옮기는 것이 좋아보입니다.
   */
  useEffect(() => {
    dispatch(fetchMultiplePokemonById(151));

    // dependency array 신경써주기
    // (eslint)
  }, [dispatch]);

  return (
    <>
      <h1 className="text=[40px] text-center">포켓몬 도감</h1>
      <nav className="flex gap=[10px] justify-center">
        <Link to={'/'}>메인</Link>
        {/**
         * 아래 링크는 지워도 될 것 같습니다.
         */}
        <Link to={'/detail/1'}>상세정보</Link>
        <Link to={'/search'}>검색</Link>
        <Link to={'/favorite'}>찜목록</Link>
      </nav>
      <main className="flex flex-wrap gap-[20px] pt-[20px] justify-center">
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/detail/:pokemonId'} element={<Detail />} />
          <Route path={'/search'} element={<Search />} />
          <Route path={'/favorite'} element={<Favorite />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
