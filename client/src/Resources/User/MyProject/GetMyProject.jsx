import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./MyProject.module.scss";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllMyProject } from "../../../Services/apiService";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

// import { getAUser } from "../../../Services/apiService";
const cx = classNames.bind(styles);

const TableMyProject = (props) => {
  
  const id_User = useSelector((state) => state.user.user?.inforUser?.id);
  const navigate = useNavigate();

  const { dataProject } = props;

  // const handeView = async () => {
  //   navigate(`/user/viewMyProject`);
  // };

  return (
    <div>
      <table className={cx("table", "table-hover", "table-bordered")}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Name Projrct</th>
            <th scope="col">Year</th>
            <th scope="col">Laudatory</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className={cx("tbody")}>
          {dataProject && dataProject.length > 0 ? (
            dataProject.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.User?.username}</td>
                <td>{item.nameDtnk}</td>
                <td>{item.year}</td>
                <td>{item.Awards?.nameAward}</td>
                <td className={cx("btn-action")}>
                  <button
                    className={cx("btn-view")}
                    onClick={() => props.handeView(item)}
                  >
                    <GrFormView />
                  </button>
                
                  <button
                    className={cx("btn-Delete")}
                    onClick={() => props.handleDeleteDpm(item)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className={cx("btn-Edit")}
                    onClick={() => props.handleClickBtnUpdate(item)}
                  >
                    <FaEdit />
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

export default TableMyProject;
