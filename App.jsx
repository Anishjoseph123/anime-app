import React, { useEffect, useState } from "react";
import AddList from "./components/AddList";
import AnimeInfo from "./components/AnimeInfo";
import AnimeList from "./components/AnimeList";
import RemoveList from "./components/RemoveList";
const App = () => {
  let [animeData, setAnimeData] = useState("");
  const [search, setSearch] = useState("");
  let [animeInfo, setAnimeInfo] = useState("");
  const [myAnimeList, setMyAnimeList] = useState([]);
  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };
  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };
  const getData = async () => {
    let res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=30`
    );
    const resData = await res.json();
    setAnimeData(resData.data);
  };
  useEffect(() => {
    getData();
  }, [search]);
  return (
    <>
      <div className="header">
        <h1>Anime App</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search Anime Here...."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="container">
        <div className="anime-info">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={AddList}
              handleList={(anime) => addTo(anime)}
            />
          </div>
          <h2 className="text-heading">Watch List</h2>
          <div className="row">
            <AnimeList
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={RemoveList}
              handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
