import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchOutlined, CheckRounded, CloseRounded } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
export const App = () => {
  const [iconState, setIconState] = useState("none");
  const onSearch = (searchString) => {
    axios({
      method: "get",
      url: "https://demo.dataverse.org/api/search",
      params: {
        q: searchString,
      },
    })
      .then((res) => {
        console.log(res);
        setIconState("ok");
      })
      .catch((_err) => {
        setIconState("err");
      });
  };

  useEffect(() => {
    if (iconState === "ok" || iconState === "err") {
      setTimeout(() => {
        setIconState("none");
      }, 3000);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="search_container">
        <input type="text" className="search_input" id="ss" />
        {iconState === "none" && (
          <IconButton
            onClick={(e) => onSearch(document.getElementById("ss")?.value)}
          >
            <SearchOutlined />
          </IconButton>
        )}
        {iconState === "ok" && (
          <IconButton disableRipple disableTouchRipple>
            <CheckRounded htmlColor="green" />
          </IconButton>
        )}
        {iconState === "err" && (
          <IconButton disableRipple disableTouchRipple>
            <CloseRounded htmlColor="red" />
          </IconButton>
        )}
      </div>
    </div>
  );
};
