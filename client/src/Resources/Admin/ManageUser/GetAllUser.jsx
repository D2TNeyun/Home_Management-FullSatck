import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const cx = classNames.bind(styles);

const TableUser = (props) => {
  const { listUser } = props;

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
                  <button className={cx("btn-view")}>
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
