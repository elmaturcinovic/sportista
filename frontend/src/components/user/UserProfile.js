import React from 'react'
import SideBarComp from './SideBarComp';
import ProfileComp from './ProfileComp';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const id = sessionStorage.getItem('id');
    const [user, setUser] = useState([]);

    function fetchUser(id) {
        axios
          .get(`http://127.0.0.1:8000/get_user/${id}/`)
          .then((response) => {
            setUser(response.data);
            sessionStorage.setItem('image', user.user_photo)
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
  
      useEffect(() => {
        fetchUser(id);
      }, [id]);  

    return (
        <div className="user-main-div">
            <SideBarComp
                 user={user}
                 fetchUser={fetchUser}
            />
            <ProfileComp
                user={user}
                fetchUser={fetchUser}
            />
        </div>
    );
}

export default UserProfile