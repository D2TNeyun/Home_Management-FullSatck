import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postCreateNewUser } from "../../../Services/apiService";
import { MdEmail } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner5 } from "react-icons/im";

import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeIcon = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const handleRegist = async () => {
    setIsLoading(true);
    //callApi
    let data = await postCreateNewUser(email, password);
    if (data && data.err === 0) {
      toast.success(data.mes);
      setIsLoading(false);
      navigate("/login");
    }
    if (data && data.err !== 0) {
      setIsLoading(false);
      toast.error(data.mes);
    }
  };
  return (
    <>
      <div className={cx("main")}>
        <div className={cx("register-container")}>
          {/* <div className={cx("Tittle-register")}>ITC Ground, Hello!!</div> */}
          <Link to={"/"} className={cx("Tittle-register")}>
            <p style={{ display: "inline-block" }}>ITC Ground, Hello!!</p>
          </Link>
          <div className={cx("Tittle2-register")}>start your journey?</div>
          <div className={cx("register-content")}>
            <div className={cx("form-register")}>
              <div className="col-md-12">
                <label className={cx("lable")}>
                  <MdEmail /> Email
                </label>
                <input
                  type="email"
                  className={cx("input")}
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="col-md-12">
                <label className={cx("lable")} htmlFor="password">
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
              <div className={cx("button")}>
                <button
                  className={cx("btnregister")}
                  onClick={() => handleRegist()}
                  disabled={isLoading}
                >
                  {isLoading === true && (
                    <ImSpinner5 className={cx("spinner")} />
                  )}
                  register
                </button>
              </div>
            </div>
          </div>
          <div className="mb-5 pb-lg-2">
            you're have an account!
            <Link className="text-decoration-none" to="/login">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
