import React,{useState,useEffect,useContext} from 'react'
import {toast} from "react-toastify";
import myContext from "../Context/createContextAPI";
import loading from "../Images/loader.gif";

import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function RecordMusic() {

  //  //! Import Context...
  const {uploadMusic,uploadLoadingState} = useContext(myContext);
  const [newAudioState,setNewAudioState] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  
  //    //! Get the access of [ User Mic ] to the web browser...
  const recordingOn = ()=>{
    navigator.getUserMedia({ audio: true },
        () => {
          toast.info('Recording Started');
          setIsBlocked(false);
        },
        () => {
          toast.error('Permission Denied, Turn on Your Mic.');
          setIsBlocked(true);
        },
    );
  }
  useEffect(()=>{
    if(isRecording){
      recordingOn();
    }
  },[isRecording])


  //  //! Timer Function...
  const [timeMinState,setTimeMinState] = useState(0);
  const [timeSecState,setTimeSecState] = useState(0);
  useEffect(()=>{
    if(isRecording){
      if(timeSecState>=59){
        setTimeMinState(timeMinState+1);
        setTimeSecState(0);
      }
      const sec = setInterval(() => {
        setTimeSecState(timeSecState+1);
      },1000);
      return ()=>clearInterval(sec);
    }
    // eslint-disable-next-line
  },[timeSecState,isRecording])

  //    //! Start Recording...
  const startRec = ()=>{
     if (isBlocked) {
      toast.error('Permission Denied, Turn on Your Mic.');
    } else {
      Mp3Recorder.start().then(() => {
          setIsRecording(true);
          setTimeMinState(0)
          setTimeSecState(0)
        }).catch((err) =>{
          recordingOn();
          console.error(err)
        });
    }
  }

//    //! Stop Recording...
const stopRec = ()=>{
    Mp3Recorder.stop()
    .getMp3()
    .then(([buffer, blob]) => {
      const fileName = "Me at: " + new Date(); 
      const fileNameModified = fileName.slice(0,fileName.length-30)
      const file = new File(buffer,fileNameModified,{
        type:blob.type,
        lastModified:Date.now()
      });
      setNewAudioState(file);
      const blobURL = URL.createObjectURL(blob);
      setBlobURL(blobURL);
      setIsRecording(false);
      toast.info('Recording Stop');
    }).catch((err) => console.error(err));
  }  

  //  //! Upload recordings...
  const uploadRecording = (e)=>{
    e.preventDefault();
    if(newAudioState!==null){
        const formData = new FormData();
        formData.append("music",newAudioState);
        uploadMusic(formData);
    }
  }

  return (
    <>
            <div className=''>
                <div className='flex flex-col justify-center items-center py-5'>
                    <div className={`${isRecording?"block":"hidden"} pb-3 mb-0 scale-150 flex flex-col justify-center items-center`}> {/* ${isRecording?"block":"hidden"} */}
                      <div className='px-1' id='showMusicFlow'>
                        <span className="voiceFlow voiceFlow-1"></span>
                        <span className="voiceFlow voiceFlow-2"></span>
                        <span className="voiceFlow voiceFlow-3"></span>
                        <span className="voiceFlow voiceFlow-4"></span>
                        <span className="voiceFlow voiceFlow-5"></span>
                      </div>
                      <div className='flex justify-center items-center'>
                        <h2 className='text-gray-500 text-sm py-1 rounded-md ring-1 ring-gray-200 px-3 my-1'>{timeMinState} : {timeSecState} <span className='-ml-[2px] text-xs text-gray-400'>sec</span></h2>
                      </div>
                    </div>
                    <button onClick={startRec} className={`${isRecording?"hidden":"inline-block"} mx-5 px-3 py-2 rounded-md bg-green-700 text-white`}>Start Recording <i className="ml-3 fa-solid fa-microphone-lines"></i></button>
                    <button onClick={stopRec} className={`${isRecording?"inline-block":"hidden"} mx-5 px-3 py-2 rounded-md bg-red-700 text-white`}>Stop Recording <i className="ml-3 fa-solid fa-microphone-lines-slash"></i></button>
                </div>
                <div className={`mt-10 grid place-content-center ${newAudioState===null?"hidden":"grid"}`}>
                    <form onSubmit={uploadRecording} className="flex flex-col justify-center items-center">
                        <p className='my-2 text-gray-700'><i className="text-gray-400 fa-solid fa-arrow-down-wide-short -scale-x-100 mr-3"></i> <span className=''>Your recording</span> <i className="text-gray-400 fa-solid fa-arrow-down-wide-short ml-3"></i></p>
                        <audio src={blobURL} controls="controls" name="music"/>
                        <button
                          type="submit"
                          disabled={newAudioState===null?true:false}
                          className="disabled:opacity-50 cursor-pointer mt-3 px-2 py-1 text-white bg-blue-700"
                        >
                          <i className="fa-solid fa-angles-up"></i> Upload{" "}
                          <i className="fa-solid fa-angles-up"></i>
                        </button>
                    </form>
                    {uploadLoadingState?
                    <div className="flex justify-center items-center">
                        <img src={loading} alt="loading" className="" width={"200px"} height={"100px"}/>
                    </div>
                    :""}
                </div>
            </div>
    </>
  )
}

export default RecordMusic;

