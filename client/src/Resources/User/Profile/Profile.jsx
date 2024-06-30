import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { getProflie } from "../../../Services/apiService";
import { useEffect, useState } from "react";
import ModalUpdateProfile from "./ModalUpdateProfile";
const cx = classNames.bind(styles);
const Profile = () => {

  const [dataUser, setDataUser] = useState("");
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  const fetchDataUser = async () => {
    try {
      let res = await getProflie();
      console.log("Data getUser", res); // Kiểm tra giá trị trả về của getAllUser
      if (res.err === 0) {
        setDataUser(res.userData);
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
    // fetchProject();
  }, []);

  const resetDataUser = () => {
    setDataUser(dataUser);
  };
  

  return (
    <>
      <div className={cx("profile-container")}>
        <div className={cx("profile-avatar")}>
          <div className={cx("img-preview")}>
            {dataUser ? (
              <img className={cx("preview")} src={`${dataUser.avatar}`} />
            ) : (
              <span className={cx("preview")}>Avatar</span>
            )}
          </div>
        </div>
        <div className={cx("profile-content")}>
          <div className="card mb-4 mb-lg-0 border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <p className={cx("textProfile")}>Full Name</p>
                </div>
                <div className="col-sm-8">
                  <p className={cx("textProfile")}>{dataUser?.username}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">
                  <p className={cx("textProfile")}>Email</p>
                </div>
                <div className="col-sm-8">
                  <p className={cx("textProfile")}>{dataUser?.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">
                  <p className={cx("textProfile")}>Position</p>
                </div>
                <div className="col-sm-8">
                  <p className={cx("textProfile")}>{dataUser?.position}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">
                  <p className={cx("textProfile")}>Deparment</p>
                </div>
                <div className="col-sm-8">
                  <p className={cx("textProfile")}>
                    {dataUser?.Department?.nameDepartment}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="button">
            <button
              className={cx("btn-update")}
              onClick={() => setShowModalUpdateUser(true)}
            >
              update profile
            </button>
          </div>
          <ModalUpdateProfile
            show={showModalUpdateUser}
            setShow={setShowModalUpdateUser}
            dataUser={dataUser}
            fetchDataUser={fetchDataUser}
            resetDataUser={resetDataUser}
            />
        </div>
      </div>
    </>
  );
};

export default Profile;
