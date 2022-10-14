import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Navbar = () => {
  const [dataSearch, setDataSearch] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRes, setIsOpenRes] = useState(false);
  const token = localStorage.getItem('token');
  console.log('TOKEN=', token);
  const navigate = useNavigate();
  const searchBtn = (name) => {
    if (name) {
      navigate(`/Search/${name}`);
    }
    setDataSearch('');
  };

  return (
    <div className="navbar_wrap">
      <div className="navbar">
        <Link className="Navbar_Title" to="/">
          <h1>MovieList</h1>
        </Link>
        <div className="Navbar_search">
          <div className="search_btn">
            <input onChange={(e) => setDataSearch(e.target.value)} value={dataSearch} className="cari" type="text" placeholder="What do you want to watch?" />
            <button type="submit">
              <BiSearchAlt onClick={() => searchBtn(dataSearch)} className="navbar_icon" />
            </button>
          </div>
        </div>
        <div className="navbar_bottom">
          {!token ? (
            <>
              <button onClick={() => setIsOpen(true)} className="login">
                Login
              </button>
              <button onClick={() => setIsOpenRes(true)} className="register">
                Register
              </button>
            </>
          ) : (
            <>
              <span className="username">{localStorage.getItem('first_name')}</span>
              <img className="avatar_user" src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" alt="avatar user" />
            </>
          )}
        </div>
      </div>

      <Login open={isOpen} onClose={setIsOpen} />
      <Register openRes={isOpenRes} onCloseRes={setIsOpenRes} />
    </div>
  );
};

export default Navbar;
