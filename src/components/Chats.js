import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpeg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "9cdbdbb1-78d8-4bd9-b5bb-2b0fadc964f6",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => setLoading(false))
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "871d7476-0f03-44c8-9372-c3c8a5a660f0",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ourChat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="9cdbdbb1-78d8-4bd9-b5bb-2b0fadc964f6"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
