import React from "react";
import AddList from "./AddList";
import Spinner from "./Spinner";
const AnimeList = ({animelist,setAnimeInfo,animeComponent,handleList}) => {
  const AddTolist=animeComponent;
  return (
    <>
    {
        animelist?(
animelist.map((anime,index)=>{
    return(
        <div>
<div className="card" key={index} onClick={()=>setAnimeInfo(anime)}>
        <img
          src={anime.images.jpg.large_image_url}
          alt="img"
        />
        <div className="animeInfo">
            <h4>{anime.title}</h4>
            <div className="overlay" onClick={()=>handleList(anime)}>
              <h4>{anime.title_japanese}</h4>
              <h3 style={{color:'blue',fontSize:'18px'}}>SYNOPSIS</h3>
              <div className="synopsis">
                <p>{anime.synopsis}</p>
              </div>
              <AddList/>
            </div>
        </div>
      </div>
        </div>

    )
})
        ):<Spinner/>
    }
      
    </>
  );
};
export default AnimeList;
