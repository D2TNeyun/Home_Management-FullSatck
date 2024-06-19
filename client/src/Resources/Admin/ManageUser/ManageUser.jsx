import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import ModalCreateUser from "./ModalCreateUser";
import React, { useState, useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import TableUser from "./GetAllUser";
import {
  getAllUser,
  getDepartment,
  getUser
} from "../../../Services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";


const cx = classNames.bind(styles);
const ManageUser = (props) => {
  // const {dataUser} = props;

  const [listUser, setListUser] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [showModalView, setShowModalView] = useState(false);

  const fetchUserList = async () => {
    try {
      let res = await getAllUser();
      console.log("Data getAll", res); // Kiểm tra giá trị trả về của getAllUser
      if (res.err === 0) {
        setListUser(res.DT.rows);
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };

  const fetchUserData = async (name) => {
    try {
      let res = await getUser(name);
      // console.log("Data get a user", res); // Kiểm tra giá trị trả về của API
      if (res.data.err === 0 && res.data.DT.rows) {
        return res.data.DT.rows[0];
      }
    } catch (error) {
      // console.error("Failed to fetch user:", error);
      return null;
    }
  };
  useEffect(() => {
    fetchUserList();
  }, []);

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdateUser(user);
  };

  const handleViewUser = (user) => {
    setShowModalView(true);
    setSelectedUser(user);
  };

  const resetDataUser = () => {
    setDataUpdateUser({});
    setSelectedUser({});
  };

  return (
    <>
      <div className={cx("manageUser-container")}>
        <div className={cx("tille")}>manageUser</div>
        <div className={cx("users-content")}>
          <div className={cx("allBtn-manageUser")}>
            <button
              className={cx("btn-addUser")}
              onClick={() => setShowModalCreateUser(true)}
            >
              <UserAddOutlined /> Add User
            </button>
          </div>
          <div className={cx("table-user")}>
            <TableUser
              listUser={listUser}
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleViewUser={handleViewUser}
            />
          </div>
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchUserList={fetchUserList}
          />
          <ModalUpdateUser
            show={showModalUpdateUser}
            setShow={setShowModalUpdateUser}
            dataUpdateUser={dataUpdateUser}
            fetchUserList={fetchUserList}
            resetDataUser={resetDataUser}
          />
          <ModalViewUser
          show={showModalView}
          setShow={setShowModalView}
          selectedUser={selectedUser}
          resetDataUser={resetDataUser}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
