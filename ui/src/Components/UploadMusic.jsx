import React, { useState, useContext } from "react";
import myContext from "../Context/createContextAPI";
import loading from "../Images/loader.gif";

function UploadMusic() {
  const { uploadMusic, uploadLoadingState } = useContext(myContext);

  //  //! Show Hide Upload Music Button...
  const [showUploadState, setShowUploadState] = useState("hidden");
  const showUpload = () => {
    if (showUploadState === "hidden") setShowUploadState("block");
    else setShowUploadState("hidden");
  };

  //  //! Upload File Submit...
  const [fileState, setFileState] = useState("");
  const onChangeFile = (e) => {
    setFileState(e.target.files[0]);
  };
  const uploadFileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("music", fileState);
    uploadMusic(formData);
  };

  return (
    <>
      <div className="">
        {/* //! Show Hide Button */}
        <div className="flex justify-center">
          <button
            id="uploadButton"
            onClick={showUpload}
            className={`bg-transparent text-black px-3 py-2 rounded-md shadow-lg ${
              showUploadState === "block border"
                ? "text-xl bg-gray-50 text-pink-400"
                : ""
            }`}
          >
            Upload Music <i className="fa fa-upload ml-2 text-blue-900"></i>
          </button>
        </div>
        {/* //! Upload Music */}
        <div className={`${showUploadState} mt-3`}>
          <div className="flex flex-col justify-center items-center mb-3">
            <h1 className="text-2xl text-blue-700 font-extrabold font-serif">
              Select Music
            </h1>
            <p className="text-xs text-gray-500 my-1 hidden">
              Selected music size is less than = 2 MB
            </p>
          </div>
          <div className="">
            <form
              onSubmit={uploadFileSubmit}
              className="flex flex-col justify-center items-center"
            >
              <input
                onChange={onChangeFile}
                type="file"
                name="music"
                className="overflow-hidden"
                required
              />
              <button
                type="submit"
                className="mt-3 px-2 py-1 cursor-pointer bg-green-600 text-white hover:bg-green-700 inline-block"
              >
                <i className="fa-solid fa-angles-up"></i> Upload{" "}
                <i className="fa-solid fa-angles-up"></i>
              </button>
            </form>
            {uploadLoadingState ? (
              <div className="flex justify-center items-center">
                <img
                  src={loading}
                  alt="loading"
                  className=""
                  width={"200px"}
                  height={"100px"}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadMusic;
