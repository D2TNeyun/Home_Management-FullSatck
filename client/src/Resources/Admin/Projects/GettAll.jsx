import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Project.module.scss";
import { GrFormView } from "react-icons/gr";
import { TrophyOutlined } from "@ant-design/icons";
// import { getAUser } from "../../../Services/apiService";
const cx = classNames.bind(styles);

const TableProject = (props) => {
  const { listProject } = props;

  return (
    <div>
      <table className={cx("table", "table-hover", "table-bordered")}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Name Topic</th>
            <th scope="col">Laudatory</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className={cx("tbody")}>
          {listProject && listProject.length > 0 ? (
            listProject.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.User?.username}</td>
                <td>{item.nameDtnk}</td>
                <td>{item.Awards?.nameAward}</td>
                <td className={cx("btn-action")}>
                  <button
                    className={cx("btn-view")}
                    onClick={() => props.handeView(item)}
                  >
                    <GrFormView />
                  </button>
                  <button
                    className={cx("btn-Edit")}
                    onClick={() => props.handleAddTrophy(item)}
                  >
                    <TrophyOutlined />
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

export default TableProject;
