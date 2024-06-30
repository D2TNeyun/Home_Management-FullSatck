import classNames from "classnames/bind";
import styles from "./Trophy.module.scss";
import { useEffect, useState } from "react";
import { getAllTrophy } from "../../../Services/apiService";
import TableTrophy from "./GetAllTrophy";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";


const cx = classNames.bind(styles);
const Trophy = (props) => {
  const [listTrophy, setListTrophy] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const fetchTrophyList = async () => {
    try {
      let res = await getAllTrophy();
      console.log("Trophy", res);
      if (res.err === 0) {
        setListTrophy(res.Data.rows);
      }
    } catch (error) {
      console.error("Failed to fetch Trophy list:", error);
    }
  };

  useEffect(() => {
    fetchTrophyList();
  }, []);

  const handleUpdate = (trophy) => {
    setShowModalUpdate(true);
    setDataUpdate(trophy);
  };
  const handleDelete = (trophy) => {
    setShowModalDelete(true);
    setDataDelete(trophy);
  };

  const resetDataUser = () => {
    setDataUpdateDpm({});
    // setSelectedUser({});
  };
  return (
    <>
      <div className={cx("Trophy-container")}>
        <div className={cx("title")}><b>List Laudatory</b></div>
        <div className={cx("dpm-content")}>
          <div className={cx("table-dpm")}>
            <TableTrophy
              listTrophy={listTrophy}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
  
            />
          </div>
          <ModalUpdate
          show={showModalUpdate}
          setShow={setShowModalUpdate}
          dataUpdate={dataUpdate}
          fetchTrophyList={fetchTrophyList}
          />
          <ModalDelete
            show={showModalDelete}
            setShow={setShowModalDelete}
            dataDelete={dataDelete}
            fetchTrophyList={fetchTrophyList}
          />
        </div>
      </div>
    </>
  );
};

export default Trophy;
