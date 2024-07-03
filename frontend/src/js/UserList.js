import userData from "../data/users.json";
import { getUsers } from "./ClientApi";
import Navbar from './NavBar';

import React from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  return (
    <div>
          <Navbar/>
      <h2 class="pageTitle">List of Users</h2>
      <ul class="list">
        {userData.company}
        {userData.users.map((user) => (
          <li class="listItem">
            <div key={user.userId}>
              <div class="persdate">
                <div class="UID">{user.userId}</div>
                <div class="separator">|</div>
                <div class="TID">{user.tenantId}</div>
                <div class="separator">|</div>
                <div class="name">{user.name}</div>
                <div class="separator">|</div>
                <div class="usname">{user.username}</div>
                <div class="separator">|</div>
                <div class="pw">{user.password}</div>
                <div class="separator">|</div>
                <div class="mail">{user.email}</div>
                <div class="separator">|</div>
                <div class="admin">{user.admin ? "true" : "false"}</div>
              </div>
            </div>
            <div class="action-list-item">
              <Link to={`/user/${user.userId}`}>
                <button class="viewButton">Details</button>
              </Link>
              <Link to={`/user/${user.userId}?view=edit`}>
                <button class="viewButton">Edit</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;