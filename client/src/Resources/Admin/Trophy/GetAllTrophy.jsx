import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Trophy.module.scss";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// import { getAUser } from "../../../Services/apiService";
const cx = classNames.bind(styles);

const TableTrophy = (props) => {
  const { listTrophy } = props;

  return (
    <div>
      <table className={cx("table", "table-hover", "table-bordered")}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Toppic</th>
            <th scope="col">Laudatory</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className={cx("tbody")}>
          {listTrophy && listTrophy.length > 0 ? (
            listTrophy.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.User?.username}</td>
                <td>{item.Dtnk?.nameDtnk}</td>
                <td>{item.nameAward}</td>
                <td className={cx("btn-action")}>
                  <button
                    className={cx("btn-Edit")}
                    onClick={() => props.handleUpdate(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={cx("btn-Delete")}
                    onClick={() => props.handleDelete(item)}
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

export default TableTrophy;
