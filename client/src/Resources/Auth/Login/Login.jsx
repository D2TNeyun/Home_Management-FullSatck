import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../../Services/apiService";
import { MdEmail } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  
  const onChangeIcon = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email is not valid");
      return;
    }
    if (!password) {
      toast.error("Password is not valid");
      return;
    }
    //callApi
    let data = await postLogin(email, password);
    if (data && data.success === true) {
      toast.success(data.message);
      navigate("/");
    }
    if (data.error && data.success !== true) {
      toast.error(data.error.message);
    }
  };

  return (
    <>
      <div className={cx("main")}>
        <div className={cx("login-container")}>
          <div className={cx("Tittle-login")} onClick={() => navigate("/")}>
            ITC Ground, Hello!!
          </div>
          <div className={cx("Tittle2-login")}>Who's this???</div>
          <div className={cx("login-content")}>
            <div className={cx("form-Login")}>
              <div className="col-md-12">
                <label className={cx("lable")}>
                  <MdEmail /> Email
                </label>
                <input
                  type="email"
                  className={cx("input")}
                  placeholder="requied email use gmail.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className={cx("lable")}>
                  <GoPasskeyFill /> Password
                </label>
                <div className={cx("password-container")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={cx("input")}
                    value={password}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                  />
                  <div className={cx("iconEye")} onClick={onChangeIcon}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              <span>Forgot password ?</span>
              <div className={cx("button")}>
                <button
                  className={cx("btnLogin")}
                  onClick={() => handleLogin()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="mb-5 pb-lg-2">
            Don'n have an account yet?
            <Link className="text-decoration-none" to="/register">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
