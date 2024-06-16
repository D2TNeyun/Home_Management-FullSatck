import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import ModalCreateUser from "./ModalCreateUser";
import React, { useState, useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import TableUser from "./GetAllUser";
import { getAllUser } from "../../../Services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const cx = classNames.bind(styles);
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdateUser, setDataUpdateUser] = useState({});

  const [listUser, setListUser] = useState([]);

  const fetchUserList = async () => {
    try {
      let res = await getAllUser();
      console.log(res); // Kiểm tra giá trị trả về của getAllUser
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
          />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
