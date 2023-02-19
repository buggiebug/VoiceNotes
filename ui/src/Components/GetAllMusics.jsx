import React, { useState, useContext, useEffect } from "react";
import { Buffer } from "buffer";
import myContext from "../Context/createContextAPI";
import loading from "../Images/loader.gif";
import { toast } from "react-toastify";

function GetAllMusics() {
  //  //! JWT Token saved by this name...
  const user1token = "user1token"; 

  //  //! Get Data From Context API...
  const { 
    musicData, 
    allMusicLoadingState,
    allMusic,
    singleMusicLoadingState,
    getSingleMusic,
    singleMusicDataPlay,
    allReadyLoggedIn,
    updateFavorite,
    favoriteLoadingState,
    deleteMusic,
    deleteLoadingState,
    searchSong,
    sortMusic,
   } = useContext(myContext);

  useEffect(()=>{
    if(!localStorage.getItem(user1token)){
      allMusic();
    }
    if(localStorage.getItem(user1token))
    {
      allReadyLoggedIn();
    }
    // eslint-disable-next-line
  },[])

  //  //! Get Single Music Data & Play...
  const [singleMusicState,setSingleMusicState] = useState("");
  const playMusicButton = (e)=>{
    setSingleMusicState(e.name);
    getSingleMusic(e._id)
  }
  
  //  //! Change Favorite...
  const changeFavorite = (e)=>{
    const bool = e.favourate;
    if(!bool){
      updateFavorite(true,e._id)
    }else{
      updateFavorite(false,e._id)
    }
  }

  //  //! Delete Music...
  const removeMusic = (id)=>{
    deleteMusic(id)
  }

  //  //! Search Song Feature...
  const [songNameChangeState,setSongNameChangeState] = useState({searchSong:""});
  const songNameChange = (e)=>{
    if(e.target.value.length<1){
      allMusic();
    }
    setSongNameChangeState({...setSongNameChangeState,[e.target.name]:e.target.value});
  }
  const searchSongSubmit = async(e)=>{
    e.preventDefault();
    if(songNameChangeState.searchSong.length<1){
      toast.info("WTF");
      return;
    }
    await searchSong(songNameChangeState.searchSong,musicData);
  }

  //  //? Need to work on It...
  //  //! Filter Song...
  const onFilterChange = (e)=>{
    const sortType = e.target.value;
    // console.log(sortType)
    sortMusic(sortType);
  }


  return (
    <>
      <div className="mb-5">
        <div className="mr-2 ml-2 grid place-items-center">
          
            <div className="flex flex-col justify-evenly md:flex-row w-[100%]">
              {/* //! Play Ground... */}
              <div className="mt-10 my-3 h-auto md:h-[50vh] rounded-md grid place-items-center">
                <div className='w-[90vw] md:w-auto grid place-items-center ring-1 ring-gray-50 p-5 shadow-lg rounded-md'>
                  <div className='mb-3 w-full flex justify-between'>
                    <p className='text-green-500 font-serif font-medium mr-5'>Playing:</p>
                    <p className='text-gray-500'>{singleMusicState}</p>
                  </div>
                  <div>
                    {singleMusicLoadingState?
                    <div className="flex justify-center">
                      <img
                        src={loading}
                        alt="loading"
                        className="bg-white my-2 rounded-lg"
                        width={"200px"}
                        height={"100px"}
                      />
                    </div>:
                    <audio controls autoPlay>
                      <source 
                      src={`data:${singleMusicDataPlay.contentType};base64,${Buffer.from(
                        singleMusicDataPlay.data
                      ).toString("base64")}`}
                      type={singleMusicDataPlay.contentType}
                      />
                    </audio>}
                  </div>
                </div>
              </div>

              {/* //! Show All Musics With Search Feature... */}
              <div className="">
                {/* //! Features... */}
                <div className="ring-1 ring-gray-50 shadow-md md:w-[30vw] rounded-md">
                  <h1 className="pt-2 mt-5 text-center font-medium text-2xl text-purple-900">
                    <i className="fa-solid fa-music text-black"></i> Collections{" "}
                    <i className="fa-solid fa-music text-black"></i>
                  </h1>
                  <div className="my-5 p-5 flex flex-wrap justify-center md:mx-16">
                      <form onSubmit={searchSongSubmit} className="flex mt-2">
                        <input
                          className="border outline-none px-3 py-1 ring-1 focus:ring-green-600 rounded-sm bg-transparent"
                          type="search"
                          name="searchSong"
                          onChange={songNameChange}
                          placeholder="Search on me"
                        />
                        <input
                          className="px-3 py-2 bg-green-600 hover:bg-green-800 text-white rounded-sm cursor-pointer"
                          type="submit"
                          value={"Search"}
                        />
                      </form>
                      <select
                        name="music"
                        className="mt-2 ml-2 px-3 py-2 ring-1 cursor-pointer outline-none text-stone-700 font-extrabold bg-transparent"
                        onChange={onFilterChange}
                      >
                        <option value="old">Old</option>
                        <option value="latest">Latest</option>
                        <option value="favorite">Favorite</option>
                      </select>
                  </div>
                </div>

                {/* //! Show All Musics... */}
                <div className="mt-10 ring-1 ring-red-100 py-2 shadow-inner h-[60vh] md:w-[30vw] rounded-md grid place-items-center overflow-scroll">
                  <div className="flex flex-col justify-center items-center">
                    {allMusicLoadingState?
                    (<div className="flex flex-col items-center justify-center">
                      <img src={loading} alt="loading" className="h-[10vh]" />
                      <h1 className="font-bold text-blue-900">Loading</h1>
                    </div>):
                    musicData.length>0?
                    musicData.map((e)=>{
                    return <div key={e._id} className={`w-[85vw] md:w-[90%] mx-5 ring-1 ring-gray-100 p-3 my-3 shadow-lg rounded-md text-gray-600 ${singleMusicState===e.name?"bg-blue-600 text-white":""}`}>
                      <div className="flex justify-between">
                        <p className="text-lg">{e.name}</p>
                        <p className="">{String(e.size / 1024 / 1024).slice(0, 4)} MB</p>
                      </div>
                      <hr className="my-2"/>
                      <div className="flex justify-between">
                        <span className="cursor-pointer text-lg" onClick={()=>{playMusicButton(e)}}>
                          <i className={`${singleMusicState!==e.name?"fa-solid fa-circle-play":"fa-solid fa-circle-pause"}`}></i>
                        </span>
                        <span className="cursor-pointer text-lg" onClick={()=>{changeFavorite(e)}}>
                          <i className={`${e.favourate?"fa-solid fa-star text-yellow-500":"fa-regular fa-star"}`}></i>{favoriteLoadingState?"Loading":""}
                        </span>
                        <span onClick={()=>{removeMusic(e._id)}} className="cursor-pointer text-lg"><i className="fa-solid fa-trash"></i>{deleteLoadingState?"Loading":""}</span>
                      </div>
                    </div>
                    }):
                    (<h1 className="text-lg font-bold tracking-wider text-yellow-300 bg-black px-3 py-2">
                      No Music Found.
                    </h1>)}
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>
    </>
  );
}

export default GetAllMusics;


