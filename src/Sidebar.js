import React from 'react';
import { FaUserMd, FaUsers, FaUserShield } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function getData(params , route) {
  params.RouteComponent(route);
}

export default function Sidebar(props) {
  let Class = "w-" + props.data + " ";
  return (
    <div className={props.hasOwnProperty("data") === true ? Class + "transition sidebar-data" : "transition user-data w-0"}>
      <Router>
      <div>
        <ul  className="desktop-navlinks">
          <li>
          <Link  onClick={e => getData(props, "roles")} to="/roles"><FaUserMd/>Manage roles</Link>
          </li>
          <li>
            <Link onClick={e => getData(props, "privileges")} to="/privileges" ><FaUsers/>Manage privileges</Link>
           </li>
           <li>
             <Link to="/users" onClick={e => getData(props, "users" )}  to="/users" ><FaUserShield/>Manage users</Link>
           </li>
        </ul>
      </div>
    </Router>
    </div>
  );
}


