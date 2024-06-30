import React, { useState } from "react";
import CreateContextAPI from "./createContextAPI";
import axios from "axios";
import { toast } from "react-toastify";

function UseContextAPI(props) {
  const url = "https://voicenotes-backend-526p.onrender.com"   //  "http://localhost:8000" // 
  const userToken = "user1token";
  const [musicData, setMusicData] = useState([]);
  const [musicDataDuplicate, setMusicDataDuplicate] = useState([]);

  const [userNameState, setUserNameState] = useState("");
  const [loginFailedState, setLoginFailedState] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  //  //! Login...
  const login = async (loginDataState) => {
    setLoadingState(true);
    const { email, password } = loginDataState;
    await axios
      .post(`${url}/api/login`, { email, password })
      .then((res) => {
        toast.info(res.data.message);
        localStorage.setItem("user1token", res.data.jwtToken);
        setMusicData(res.data.musicData);
        setUserNameState(res.data.isUserExit.name);
        setMusicDataDuplicate(res.data.musicData);
        setLoginFailedState(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoginFailedState(true);
      });
    setLoadingState(false);
  };

  //  //! Signup...
  const signup = async (signupDataState) => {
    setLoadingState(true);
    const { name, email, password } = signupDataState;
    await axios
      .post(`${url}/api/signup`, { name, email, password })
      .then((res) => {
        toast.info(res.data.message);
        localStorage.setItem(userToken, res.data.jwtToken);
        setMusicData(res.data.musicData);
        setUserNameState(res.data.newUser.name);
        setLoginFailedState(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoginFailedState(true);
      });
    setLoadingState(false);
  };

  //  //! Get Music by Default...
  const [allMusicLoadingState, setAllMusicLoadingState] = useState(false);
  const allMusic = async () => {
    setAllMusicLoadingState(true);
    await axios
      .get(`${url}/api/all-music`)
      .then((res) => {
        const data = res.data.allMusics;
        const musicDataLatest = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMusicData(musicDataLatest);
        setMusicDataDuplicate(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setAllMusicLoadingState(false);
  };

  //  //! Already Logged In...
  const allReadyLoggedIn = async () => {
    setAllMusicLoadingState(true);
    await axios
      .get(`${url}/api/me`, {
        headers: {
          user1token: localStorage.getItem(userToken),
        },
      })
      .then((res) => {
        const musicDataLatest = res.data.musicData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMusicData(musicDataLatest);
        setUserNameState(res.data.userData);
        setMusicDataDuplicate(res.data.musicData);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setAllMusicLoadingState(false);
  };

  //  //! Get Single Music...
  const [singleMusicLoadingState, setSingleMusicLoadingState] = useState(false);
  const [singleMusicDataPlay, setMusicDataPlay] = useState({
    contentType: "",
    data: { type: "Buffer", data: [] },
  });
  const getSingleMusic = async (id) => {
    setSingleMusicLoadingState(true);
    await axios
      .get(`${url}/api/music/${id}`)
      .then((res) => {
        const data = res.data.singleMusic.musicData;
        setMusicDataPlay({
          contentType: data.contentType,
          data: { type: data.data.type, data: data.data.data },
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setSingleMusicLoadingState(false);
  };

  //  //! Update Favorite...
  const [favoriteLoadingState, setFavoriteLoadingState] = useState(false);
  const updateFavorite = async (boolValue, id) => {
    setFavoriteLoadingState(true);
    if (boolValue) {
      toast.info("Added to Fav list");
    } else {
      toast.info("Remove from Fav list");
    }
    await axios
      .put(`${url}/api/music/${id}`, { boolValue })
      .then((res) => {
        setMusicData(res.data.allMusic);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setFavoriteLoadingState(false);
  };

  //  //! Delete Music from list...
  const [deleteLoadingState, setDeleteLoadingState] = useState(false);
  const deleteMusic = async (id) => {
    setDeleteLoadingState(true);
    await axios.delete(`${url}/api/music/${id}`, {
      headers: {
        "user1token": localStorage.getItem(userToken)
      }
    }).then((res) => {
      setMusicData(res.data.allMusic);
      toast.success("Clip removed");
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
    setDeleteLoadingState(false);
  }

  //  //! Upload Music...
  const [uploadLoadingState, setUploadLoadingState] = useState(false);
  const uploadMusic = async (formData) => {
    setUploadLoadingState(true);
    await axios.post(`${url}/api/upload`, formData, {
      headers: {
        "user1token": localStorage.getItem(userToken)
      }
    }).then((res) => {
      const data = res.data.allMusics;
      setMusicData(data);
      toast.success("Music Uploaded");
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
    setUploadLoadingState(false);
  }

  //  //! Search Song by Name...
  const searchSong = (songName, musicDataDisplay) => {
    const filterData = musicDataDisplay
      .map((e) => {
        return String(e.name)
          .toLowerCase()
          .match(String(songName).toLowerCase())
          ? e
          : undefined;
      })
      .filter((e) => {
        return e !== undefined;
      });
    if (filterData.length < 1) {
      toast.info(songName + " not found");
    }
    if (filterData?.length) {
      setMusicData(filterData);
    }
  };


  //  //! Sort Music by Its Type...
  const sortMusic = (sortType) => {
    if (sortType === "old") {
      const musicDataOld = musicDataDuplicate.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMusicData(musicDataOld);
    }
    if (sortType === "latest") {
      const musicDataLatest = musicDataDuplicate.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMusicData(musicDataLatest);
    }
    if (sortType === "a-z") {
      const musicDataLatest = musicDataDuplicate.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setMusicData(musicDataLatest);
    }
    if (sortType === "z-a") {
      const musicDataLatest = musicDataDuplicate.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      setMusicData(musicDataLatest);
    }
    if (sortType === "favorite") {
      const data = musicDataDuplicate
        .map((e) => {
          return e.favourate ? e : undefined;
        })
        .filter((e) => {
          return e !== undefined;
        });
      setMusicData(data);
    }
  };

  return (
    <CreateContextAPI.Provider
      value={{
        loginFailedState,
        loadingState,
        login,
        signup,
        userNameState,
        setUserNameState,
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
        uploadMusic,
        uploadLoadingState,
        searchSong,
        sortMusic,
      }}
    >
      {props.children}
    </CreateContextAPI.Provider>
  );
}

export default UseContextAPI;
