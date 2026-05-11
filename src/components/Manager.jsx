import React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const showref = useRef();
    const passref = useRef();
    const [form, setform] = useState({id:"", site: "", username: "", password: "" })
    const [passwordarray, setPasswordarray] = useState([])
    const [foredit, setforedit] = useState({});

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
            if(foredit.id)
            {

                 const idpassword = {...foredit,...form}
                 const newpasswordarray = [...passwordarray]
                 const index = newpasswordarray.indexOf(foredit)
                 newpasswordarray[index]=idpassword;
                setPasswordarray(newpasswordarray)
                localStorage.setItem("passwords", JSON.stringify(newpasswordarray));
                setform({ site: "", username: "", password: "" })
                setforedit({})
                toast.success('Password Changed !', {
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
            else{
                const idpassword = {...form, id : uuidv4()}
                setPasswordarray([...passwordarray, idpassword])
                localStorage.setItem("passwords", JSON.stringify([...passwordarray, idpassword]));
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
        }
    };



    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    const copytext = (text) => {
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


    const handledelete = (item) => {
        let newarray = [...passwordarray];
        let index = passwordarray.indexOf(item)
        if (index !== -1) {
            const isDelete = confirm("Do you really want to delete this password?");
            if (isDelete) {
                newarray.splice(index, 1);
                setPasswordarray(newarray)
                localStorage.setItem("passwords", JSON.stringify(newarray));
                toast.info('Deleted Successfully!', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        else {
            toast.warn('Error!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
            });
        }



    }


    const handleedit =(item)=>{
        let newarray = [...passwordarray];
        let index =newarray.indexOf(item);
        if(index !== -1)
        {
           setform({ ...form, ...item})
           setforedit(item)
        }
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
            <div className="fixed  top-0 z-[-2] min-h-screen w-full rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

            <div className="mycontainer my-5">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='  text-green-700'> &lt;</span>

                    <span>Pass</span><span className=' text-green-700'>OP/&gt;</span>

                </h1>
                <p className='text-green-900 text-1g text-center'>Your own Password Manager</p>

                <div className="text-white md:gap-9 flex flex-col items-center p-4 gap-4">
                    <input onChange={handlechange} value={form.site} name="site" placeholder="Enter Website Full URL" 
                    className="border-green-500 outline-none border rounded-full text-black p-1 px-2 md:w-3/4 md:pr-0 pr-20" type="text" />

                    <div className="flex md:flex-row flex-col justify-between md:w-3/4 gap-3">
                        <input onChange={handlechange} value={form.username} name="username" placeholder="Enter Username" className="border-green-500 border outline-none md:w-[50%] text-black rounded-full p-1 px-2" type="text" />



                        <div className="relative md:w-[50%]">
                            <input ref={passref} onChange={handlechange} value={form.password} name="password" placeholder="Enter Password" className="border-green-500 border outline-none w-full text-black rounded-full p-1 px-2 pr-20 md:pr-10" type="password" />
                            <span className="absolute text-black right-3 top-1/2 -translate-y-1/2">
                                <img ref={showref} onClick={showpass} src="icons/eye.png" className="w-[25px] hover:cursor-pointer" alt="" />
                            </span>
                        </div>
                    </div>

                    <div onClick={savepassword} className="submit-btn border border-black bg-green-600 hover:bg-green-400 flex items-center p-1 px-7 rounded-full cursor-pointer">
                        <lord-icon
                            src="https://cdn.lordicon.com/piurhpdv.json"
                            trigger="click"
                            target=".submit-btn"
                            style={{ width: "28px", height: "28px" }}
                        ></lord-icon>

                        <span className="text-xl">Submit</span>
                    </div>
                </div>

                <div className="passwords ">
                    <h2 className="w-[75%] flex justify-center items-center m-auto font-bold text-xl py-4">Your Passwords</h2>
                    {passwordarray.length === 0 && <div>No password to show</div>}
                    {passwordarray.length !== 0 &&
                        <table className="px-5 table-auto w-[75%] m-auto bg-green-100  overflow-hidden rounded-lg">
                            <thead className="bg-green-800 ">
                                <tr className="text-white" >
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Pass</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordarray.map((item) => {
                                    return <tr className="border border-white ">
                                        <td>
                                            <div className="py-2   flex justify-center  overflow-auto">
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
                                            <div className="py-2   flex justify-center  overflow-auto">
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
                                            <div className="py-2   flex justify-center  overflow-auto">
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
                                        <td className="">
                                            <div className="actions flex  justify-center  gap-8 items-center">

                                                <div className="edit">
                                                    <span onClick={()=>handleedit(item)} className="cursor-pointer  flex justify-center">
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="click"
                                                            style={{ "width": "28px", "height": "28px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                                <div className="delete">
                                                    <span onClick={() => handledelete(item)} className="cursor-pointer  flex justify-center">

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="click"
                                                            style={{ "width": "28px", "height": "28px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>
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