import React, {  useState } from 'react'
import './Register.css';
import { CgCloseO } from 'react-icons/cg';
import { AiOutlineMail } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';
// import { FiEyeOff } from 'react-icons/fi';
import axios from 'axios'

const Register = ({ openRes, onCloseRes }) => {
    const API_ENDPOINT=`http://notflixtv.herokuapp.com/api/v1/users`
    const [preview, setDatapreview]=useState(null)
    const [image, setDataImage]=useState(null)
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })        
    if(!openRes) return null
    const handleDataInput = (e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }
    console.log(image)
    const dataSend = (e) =>{
        e.preventDefault()
        const user = {
            first_name: data.first_name,
            last_name: data.last_name,
            image: image,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
        }
        axios.post(API_ENDPOINT, user ,{
            header  : {
                "content-type": "multipart/form-data"
            }
        }).then(res=> console.log(res))
        .catch(err=>console.log(err.message))
    }
    
  return (
    <div className={`wrap_form_Res`}>
        <div className="item_form_Res">
            <h1> Create Account</h1>
            <CgCloseO onClick={()=>onCloseRes(false)} className='icon_close'/>
        </div>
        <hr />
        <div>
            <form>
                <div className='input_img'>
                    {
                        preview ? <img src={preview} alt="prevew " className='preview_Img'/> : <BiUserCircle className='iconUser' />
                    }
                    <input type="file" id='file' onChange={(e) => {
                        setDataImage(e.target.files[0])
                        setDatapreview(URL.createObjectURL(e.target.files[0]))
                    }
                    } />
                    <label htmlFor="file">
                        <BsFillCameraFill className='iconCamera' />
                    </label>
                </div>

                <div className="input_box">
                    <input onChange={handleDataInput} name="first_name" type="text" placeholder='First Name' pattern="^[a-zA-Z\s'-]{1,100}$" required/>
                    <FaRegUser className='icon_form'/>
                </div>
                <div className="input_box">
                <input onChange={handleDataInput}  type="text" placeholder='Last Name' name="last_name" pattern="^[a-zA-Z\s'-]{1,100}$" required/>
                <FaRegUser className='icon_form'/>
                </div>
                <div className="input_box">
                <input onChange={handleDataInput} type="email" placeholder='Email Address' name="email" pattern='^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,}$' required/>
                <AiOutlineMail className='icon_form'/>
                </div>
                
                <div className="pass_box">
                <input onChange={handleDataInput}  type="password" placeholder='Password' name="password" required />
                <FiEye className='icon_form'/>
                {/* <span>
                    <FiEyeOff/>
                </span> */}
                </div>
                <div className="pass_box">
                <input onChange={handleDataInput}  type="password" placeholder='Password Confirmation' name="password_confirmation" required />
                <FiEye className='icon_form'/>
                {/* <span>
                    <FiEyeOff/>
                </span> */}
                </div>

                <button type="submit" onClick={dataSend} className='button'>Register Now</button>
            </form>
        </div>
        

    </div>
  )
}

export default Register