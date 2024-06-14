import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import ModalCreateUser from "./ModalCreateUser";

import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";

const cx = classNames.bind(styles);
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <>
      <div className={cx("manageUser-container")}>
        <div className={cx("tille")}>manageUser</div>
        <div className={cx("users-content")}>
          <div className={cx("allBtn-manageUser")}>
            <button
              className={cx("btn-addUser")}
              onClick={() => setShowModalCreateUser(true)}>
              <UserAddOutlined /> Add User
            </button>
          </div>
          <div className={cx("table-user")}>table user</div>
          <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser}/>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
