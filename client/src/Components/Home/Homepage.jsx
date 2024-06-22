import React from "react";
import classNames from "classnames/bind";
import styles from "../Home/HomePage.module.scss";
import videoSource from "../../assets/for-them.mp4";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Homepage() {
  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("videoSoure")}>
          <video autoPlay muted loop className={cx("video")}>
            <source src={videoSource} type="video/mp4" />
          </video>
          <div className={cx("homepage-content")}>
            <div className={cx("titleIntro")}>
              <div className={cx("title-1")}>Welcome back to ITC Group!!!</div>
              <div className={cx("title-2")}>Let's get you Regitsered!</div>
              <div className={cx("title-3")}>
                  <Link to="/register"  className={cx("btnRegister")}>
                    <p style={{ display: "inline-block", color: "black" }}>
                      Register Now
                    </p>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
