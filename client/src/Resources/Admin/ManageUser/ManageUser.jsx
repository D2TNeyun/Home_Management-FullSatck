import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import ModalCreateUser from "./ModalCreateUser";
import React, { useState, useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import TableUser from "./GetAllUser";
import { getAllUser } from "../../../Services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const cx = classNames.bind(styles);
const ManageUser = (props) => {
  // const {dataUser} = props;

  const [listUser, setListUser] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [showModalView, setShowModalView] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

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

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDeleteUser(user);
  };

  const resetDataUser = () => {
    setDataUpdateUser({});
    setSelectedUser({});
  };

  return (
    <>
      <div className={cx("manageUser-container")}>
        <div className={cx("tille")}><b>List Employee</b></div>
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
              handleClickBtnDelete={handleClickBtnDelete}
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
          <ModalDeleteUser
            show={showModalDeleteUser}
            setShow={setShowModalDeleteUser}
            dataDeleteUser={dataDeleteUser}
            fetchUserList={fetchUserList}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
