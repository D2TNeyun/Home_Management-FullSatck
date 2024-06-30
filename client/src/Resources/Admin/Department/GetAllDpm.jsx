import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Department.module.scss";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// import { getAUser } from "../../../Services/apiService";
const cx = classNames.bind(styles);

const TableDpm = (props) => {
  const { listDpm } = props;

  return (
    <div>
      <table className={cx("table", "table-hover", "table-bordered")}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className={cx("tbody")}>
          {listDpm && listDpm.length > 0 ? (
            listDpm.map((item, index) => (
              <tr key={index}>
                <th>{item.id}</th>
                <td>{item.nameDepartment}</td>
                <td className={cx("btn-action")}>
                  <button
                    className={cx("btn-Edit")}
                    onClick={() => props.handleUpdateDpm(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={cx("btn-Delete")}
                    onClick={() => props.handleDeleteDpm(item)}
                  >
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

export default TableDpm;
