import React,{useState,useContext,useEffect} from "react";
import myContext from "../Context/createContextAPI";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import loading from "../Images/loader.gif";

function Login() {
    const navigate = useNavigate();
    const {login,signup,loadingState} = useContext(myContext);

    useEffect(()=>{
        if(localStorage.getItem("user1token")){
            navigate("/");
        }
        // eslint-disable-next-line
    },[localStorage.getItem("user1token")]);

    const [displayState,setDisplayState] = useState("hidden");
    const showBTN = ()=>{
        if(displayState==="block") setDisplayState("hidden");
        else setDisplayState("block");
    }

    //  //!  ....Login....
    const [loginDataState,setLoginDataState] = useState({email:"",password:""});
    const onChangeLoginFields = (e)=>{
        setLoginDataState({...loginDataState,[e.target.name]:e.target.value});
    }
    const onLoginSubmit = async(e)=>{
        e.preventDefault();
        if(loginDataState.email.length<5){
            toast.warn("Invalid Email");
            return;
        }
        if(loginDataState.password.length<8){
            toast.warn("Invalid Password");
            return;
        }
        await login(loginDataState);
    }

    //  //! .....Signup.....
    const [signupDataState,setSignupDataState] = useState({name:"",email:"",password:""});
    const changeSignupFields = (e)=>{
        setSignupDataState({...signupDataState,[e.target.name]:e.target.value});
    }
    const onSignupSubmit = async(e)=>{
        e.preventDefault();
        if(signupDataState.name.length<3){
            toast.warn("Name is required");
            return;
        }
        if(signupDataState.email.length<5){
            toast.warn("Invalid Email");
            return;
        }
        if(signupDataState.password.length<8){
            toast.warn("Password must be >= 8 char long");
            return;
        }
        await signup(signupDataState);
    }

  return (
    <>
    <div className="grid place-items-center mt-20">
      <div className="my-10 w-[90vw] md:w-[40vw] p-3 rounded-md shadow-inner ring-1 ring-gray-300">
        {/* //!........ Login ........ */}
        <div className={`${displayState==="hidden"?"block":"hidden"} shadow-md p-3 rounded-md ring-1 ring-gray-300`}>
            <h1 className="text-2xl underline font-mono text-lime-500">Login</h1>
            <div className={`flex justify-center py-5`}>
                <form onSubmit={onLoginSubmit}>
                    <div className="mb-2">
                        <label htmlFor="email" className="text-gray-600">Email :</label><br />
                        <input onChange={onChangeLoginFields} className={`outline-none ring-1 ring-gray-200 px-3 py-2 rounded-sm focus:ring-lime-500`} type="email" name="email" placeholder="your@mail.com"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="text-gray-600">Password :</label><br />
                        <input onChange={onChangeLoginFields} className={`outline-none ring-1 ring-gray-200 px-3 py-2 rounded-sm focus:ring-lime-500`} type={`text`} name="password" placeholder="12az@!21"/>
                    </div>
                    <div className="mb-2">
                        <p onClick={showBTN} className="hover:font-medium underline text-blue-500 hover:text-blue-700 inline-block cursor-pointer">Signup</p>
                        {loadingState?
                        <div className="float-right">
                            <img src={loading} alt="loading" className="" width={"80px"} height={"80px"}/>
                        </div>
                        :<input className="float-right cursor-pointer px-2 py-1 shadow-md bg-lime-700 hover:bg-lime-600 text-white rounded-sm" type="submit" value={"Login"}/>}
                    </div>
                </form>
            </div>
        </div>
        {/* //!........ Signup ........ */}
        <div className={`${displayState==="block"?"block":"hidden"} shadow-md p-3 rounded-md ring-1`}>
            <h1 className="text-2xl underline font-mono text-blue-500">Signup</h1>
            <div className={`flex justify-center py-5`}>
                <form onSubmit={onSignupSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name" className="text-gray-600">Name :</label><br />
                        <input onChange={changeSignupFields} className={`outline-none ring-1 ring-gray-200 px-3 py-2 rounded-sm focus:ring-blue-500`} type="text" name="name" placeholder="Name"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="text-gray-600">Email :</label><br />
                        <input onChange={changeSignupFields} className={`outline-none ring-1 ring-gray-200 px-3 py-2 rounded-sm focus:ring-blue-500`} type="email" name="email" placeholder="your@mail.com"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="text-gray-600">Password :</label><br />
                        <input onChange={changeSignupFields} className={`outline-none ring-1 ring-gray-200 px-3 py-2 rounded-sm focus:ring-blue-500`} type={`text`} name="password" placeholder="12az@!21"/>
                    </div>
                    <div className="mb-2">
                        <p onClick={showBTN} className="hover:font-medium underline text-lime-600 hover:text-lime-700 inline-block cursor-pointer">Login</p>
                        <input className="float-right cursor-pointer px-2 py-1 shadow-md bg-blue-700 hover:bg-blue-600 text-white rounded-sm" type="submit" value={"Signup"}/>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;


