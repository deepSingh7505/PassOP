import React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const showref = useRef();
    const passref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setPasswordarray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordarray(JSON.parse(passwords));
        }
    }, [])

    const showpass = () => {
        if (showref.current.src.includes("icons/eye.png")) {
            showref.current.src = "icons/eyecross.png"
        }
        else {
            showref.current.src = "icons/eye.png"
        }
        if (passref.current.type === "password") {
            passref.current.type = "text"
        }
        else {
            passref.current.type = "password"
        }
    }
    const savepassword = () => {
        if (form.site === "" || form.password === "" || form.username === "") {
            toast.error('Field is Empty', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            setPasswordarray([...passwordarray, form])
            localStorage.setItem("passwords", JSON.stringify([...passwordarray, form]));
            setform({ site: "", username: "", password: "" })
            toast.success('Password saved !', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copytext = (text) => {
        console.log(`text to be copied is ${text}`);
        navigator.clipboard.writeText(text);
        toast.success('Copied !', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

            <div className="mycontainer my-5">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='  text-green-700'> &lt;</span>

                    <span>Pass</span><span className=' text-green-700'>OP/&gt;</span>

                </h1>
                <p className='text-green-900 text-1g text-center'>Your own Password Manager</p>

                <div className="text-white  flex flex-col items-center p-4 gap-4">
                    <input onChange={handlechange} value={form.site} name="site" placeholder="Enter Website URL" className="border-green-500 outline-none border rounded-full text-black p-1 px-2 w-3/4" type="text" />

                    <div className="flex justify-between w-3/4 gap-3">
                        <input onChange={handlechange} value={form.username} name="username" placeholder="Enter Username" className="border-green-500 border outline-none w-[50%] text-black rounded-full p-1 px-2" type="text" />



                        <div className="relative w-[50%]">
                            <input ref={passref} onChange={handlechange} value={form.password} name="password" placeholder="Enter Password" className="border-green-500 border outline-none w-full text-black rounded-full p-1 px-2 pr-10" type="password" />
                            <span className="absolute text-black right-3 top-1/2 -translate-y-1/2">
                                <img ref={showref} onClick={showpass} src="icons/eye.png" className="w-[25px] hover:cursor-pointer" alt="" />
                            </span>
                        </div>
                    </div>

                    <div onClick={savepassword} className="submit-btn border border-black bg-green-600 hover:bg-green-400 flex items-center p-1 px-3 rounded-full cursor-pointer">
                        <lord-icon
                            src="https://cdn.lordicon.com/piurhpdv.json"
                            trigger="click"
                            target=".submit-btn"
                            style={{ width: "28px", height: "28px" }}
                        ></lord-icon>

                        <span className="text-xl">Submit</span>
                    </div>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-xl py-4">Your Passwords</h2>
                    {passwordarray.length === 0 && <div>No password to show</div>}
                    {passwordarray.length !== 0 &&
                        <table className="table-auto w-full bg-green-100  overflow-hidden rounded-lg">
                            <thead className="bg-green-800 ">
                                <tr className="text-white" >
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Pass</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordarray.map((item) => {
                                    return <tr>
                                        <td>
                                            <div className="py-2 border border-white  flex justify-center  overflow-auto">
                                                <span className="cursor-pointer  flex justify-center ">

                                                    <a href={item.site} target="_blank">{item.site} </a>
                                                    <div onClick={() => copytext(item.site)} className="">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="click"
                                                            style={{ width: "28px", height: "28px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 border border-white  flex justify-center  overflow-auto">
                                                <span className="cursor-pointer  flex justify-center ">

                                                    {item.username}
                                                    <div onClick={() => copytext(item.username)} className="">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="click"
                                                            style={{ width: "28px", height: "28px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2 border border-white  flex justify-center  overflow-auto">
                                                <span className="cursor-pointer  flex justify-center ">

                                                    {item.password}
                                                    <div onClick={() => copytext(item.password)} className="">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="click"
                                                            style={{ width: "28px", height: "28px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>

            </div>


        </>
    );
};

export default Manager;