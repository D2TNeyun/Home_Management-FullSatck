import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { getUser } from "../../../Services/apiService";
import ModalViewUser from "./ModalViewUser";
const cx = classNames.bind(styles);

const TableUser = (props) => {
  const { listUser } = props;

  // const fetchUserData = async (name) => {
  //   try {
  //     let res = await getUser(name);
  //     console.log("Data get a user", res); // Kiểm tra giá trị trả về của API
  //     if (res.data.err === 0 && res.data.DT.rows) {
  //       return res.data.DT.rows[0];
  //     }
  //   } catch (error) {
  //     // console.error("Failed to fetch user:", error);
  //     return null;
  //   }
  // };

  // const handleViewUser = async (name) => {
  //   const userData = await fetchUserData(name);
  //   if (userData) {
  //     setShowModalView(true);
  //     setSelectedUser(userData);
  //     // props.setShowModalView(true);
  //   }
  // };

  return (
    <div>
      <table className={cx("table", "table-hover", "table-bordered")}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Position</th>
            <th scope="col">Email</th>
            <th scope="col">Name Department</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className={cx("tbody")}>
          {listUser && listUser.length > 0 ? (
            listUser.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <td>{item.username}</td>
                <td>{item.position}</td>
                <td>{item.email}</td>
                <td>{item.Department?.nameDepartment}</td>
                {/* Sử dụng optional chaining để tránh lỗi khi Department không tồn tại */}
                <td className={cx("btn-action")}>
                  <button
                    className={cx("btn-view")}
                    onClick={() => props.handleViewUser(item)}
                  >
                    <GrFormView />
                  </button>
                  <button
                    className={cx("btn-Edit")}
                    onClick={() => props.handleClickBtnUpdate(item)}
                  >
                    <FaEdit />
                  </button>
                  <button className={cx("btn-Delete")}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
