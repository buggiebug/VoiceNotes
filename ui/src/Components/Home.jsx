import React, { useContext, useState } from "react";
import GetAllMusics from "./GetAllMusics";
import myContext from "../Context/createContextAPI";
import RecordMusic from "./RecordMusic.jsx"
import UploadMusic from "./UploadMusic";
function Home() {
  const { userNameState } = useContext(myContext);

  const [recordingState,setRecordingState] = useState(false);
  const [musicState,setMusicState] = useState(false);

  const handleRecoding = ()=>{setRecordingState(!recordingState)}
  const handleMusic = ()=>{setMusicState(!musicState)}

  return (
    <>
      <div className="mt-24">
        <div className={`${userNameState !== "" ? "block" : "hidden"} ml-8`}>
          <span className="font-serif font-semibold text-gray-600 text-lg">Welcome,</span>
          <span className="ml-3 text-bs font-ligh uppercase">{userNameState}</span>
        </div>
      </div>
      <div className="md:mt-5 mt-7 flex flex-col justify-center items-center">
        <div className="w-[80vw] flex flex-col justify-center items-center my-5">
          <p className="mb-2 text-2xl font-serif font-semibold text-gray-600">Voice Notes</p>
          <p className="text-gray-800 font-extralight text-sm text-center">Record your notes in the form of music or upload your voice notes on the cloud, Which you can access from anywhere at any time. Here you can also upload your favorite songs. Your data will be secured and access only by you.</p>
        </div>
        <div className="w-[80vw]">
          <p className="text-center text-sm text-red-700">
            Before starting to record or upload any music, you must ensures that you're logged in else you're unable to upload the data on the cloud.
          </p>
        </div>
      </div>
      <hr className="my-3 mx-5" />

      <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
        <button onClick={handleRecoding} className="px-3 py-2 bg-yellow-500 text-white rounded-md outline-none">Recording</button>
        <button onClick={handleMusic} className="px-3 py-2 bg-red-400 text-white rounded-md outline-none">Music</button>
      </div>

      {
        recordingState &&
        <>
          <div className="flex flex-wrap justify-center items-center">
            <div className="mt-2 mx-3 shadow-sm p-5 rounded-xl">
              <RecordMusic />
            </div>
            <hr />
            <div className="mt-2 mx-3 shadow-sm p-5 rounded-xl">
              <UploadMusic />
            </div>
          </div>
        </>
      }
      {
        musicState &&
        <>
          <GetAllMusics />
        </>
      }
    </>
  );
}

export default Home;



