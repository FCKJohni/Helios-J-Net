import React, { useLayoutEffect, useState } from "react";

import HeliosAlert from "../components/Alert";
import { InitialTransition } from "../components/Transition";
import Login from "../Login";
import SiteNav, { ContentGroup } from "react-site-nav";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import verdictImage from "../assets/verdict.png";
import folderImage from "../assets/folder.png";
import adminImage from "../assets/admin.png";

export default function Dashboard({ token, setToken, perms, setPerms }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertContent, setAlertContent] = useState("");

  function reset() {
    localStorage.removeItem("token");
    <Login setToken={setToken} />;
  }

  useLayoutEffect(() => {
    fetch("http://localhost:8080/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token.trim()}`,
      },
    })
      .then((data) => {
        if (data.status === 401) {
          reset();
        } else {
          const json = data.json();
          if (json.perms) {
            setPerms(json.perms);
          } else {
            reset();
          }
        }
      })
      .catch(function (error) {
        if (error.message === "Failed to fetch") {
          setAlertType("error");
          setAlertContent(
            "Verbindung zu HeliosJNet kann nicht hergestellt werden."
          );
          setShowAlert(true);
        }
      });
  });

  return (
    <>
      <div className="App">
        <SiteNav
          background="transparent"
          fontSize="18"
          FontFamily="Helvetica, sans-serif"
        >
          <ContentGroup title="Richter" height="200">
            <ul>
              <li>
                <img src={adminImage} width="40" height="40" alt="adminjudge" />
                <Link to="/manage/judge">Verwaltung</Link>
              </li>
              <li>
                <img src={verdictImage} width="40" height="40" alt="logo" />
                <Link to="/verdict">Beschlüsse</Link>
              </li>
              <li>
                <img src={folderImage} width="40" height="40" alt="folder" />
                <Link to="/archive">Archiv</Link>
              </li>
            </ul>
          </ContentGroup>
          <ContentGroup title="Staatsanwaltschaft" height="200">
            <ul>
              <li>
                <img src={adminImage} width="40" height="40" alt="adminsta" />
                <Link to="/manage/sta">Verwaltung</Link>
              </li>
            </ul>
          </ContentGroup>
        </SiteNav>
        {showAlert && <HeliosAlert text={alertContent} type={alertType} />}
      </div>
      <InitialTransition />
    </>
  );
}
