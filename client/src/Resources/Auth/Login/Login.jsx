import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../../Services/apiService";
import { MdEmail } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner5 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../../Redux/Reducer/userSlice";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeIcon = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    //callApi
    let data = await postLogin(email, password);
    if (data && data.success === true) {
      // const token = data.data.split(' ')[1]; // Lấy token từ dữ liệu trả về
      // localStorage.setItem("token", token); // // Lưu trữ token vào localStorage

      dispatch(doLoginAction(data));
      localStorage.setItem('token', data.data); // Lưu token vào localStorage
      if (data.inforUser.position === "Giam doc") {
        setIsLoading(false);
        console.log("dang nhap voiws tu cach giam doc");
        navigate("/admin");
      } else {
        console.log("dang nhap voiws tu cach user");
        setIsLoading(false);
        navigate("/");
      }
    }
    if (data.error && data.success !== true) {
      toast.error(data.error.message);
      setIsLoading(false);
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
                  disabled={isLoading}
                >
                  {isLoading === true && (
                    <ImSpinner5 className={cx("spinner")} />
                  )}
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
