import classNames from "classnames/bind";
import styles from "./Department.module.scss";
import { useEffect, useState } from "react";
import { getAllDpm } from "../../../Services/apiService";
import TableDpm from "./GetAllDpm";
import ModalCreateUser from "./ModalCreateDpm";
import { FcPlus } from "react-icons/fc";
import ModalUpdateDpm from "./ModalUpdateDpm";
import ModalDeleteDpm from "./ModalDeleteDpm";

const cx = classNames.bind(styles);
const Department = (props) => {
  const [listDpm, setListDpm] = useState([]);
  const [dataUpdateDpm, setDataUpdateDpm] = useState({});
  const [dataDeleteDpm, setDataDeleteDpm] = useState({});

  const [showModalCreateDpm, setShowModalCreateDpm] = useState(false);
  const [showModalUpdateDpm, setShowModalUpdateDpm] = useState(false);
  const [showModalDeleteDpm, setShowModalDeleteDpm] = useState(false);

  const fetchDpmList = async () => {
    try {
      let res = await getAllDpm();
      console.log("Department", res);
      if (res.err === 0) {
        setListDpm(res.Data.rows);
      }
    } catch (error) {
      console.error("Failed to fetch Department list:", error);
    }
  };

  useEffect(() => {
    fetchDpmList();
  }, []);

  const handleUpdateDpm = (dpm) => {
    setShowModalUpdateDpm(true);
    setDataUpdateDpm(dpm);
  };
  const handleDeleteDpm = (dpm) => {
    setShowModalDeleteDpm(true);
    setDataDeleteDpm(dpm);
  };

  const resetDataUser = () => {
    setDataUpdateDpm({});
    // setSelectedUser({});
  };
  return (
    <>
      <div className={cx("department-container")}>
        <div className={cx("title")}><b>List Deparment</b></div>
        <div className={cx("dpm-content")}>
          <div className={cx("btn-dpm")}>
            <button
              className={cx("btn-add")}
              onClick={() => setShowModalCreateDpm(true)}
            >
              <FcPlus /> Add Department
            </button>
          </div>
          <div className={cx("table-dpm")}>
            <TableDpm
              listDpm={listDpm}
              handleUpdateDpm={handleUpdateDpm}
              handleDeleteDpm={handleDeleteDpm}
            />
          </div>
          <ModalCreateUser
            show={showModalCreateDpm}
            setShow={setShowModalCreateDpm}
            fetchDpmList={fetchDpmList}
          />
          <ModalUpdateDpm
            show={showModalUpdateDpm}
            setShow={setShowModalUpdateDpm}
            dataUpdateDpm={dataUpdateDpm}
            fetchDpmList={fetchDpmList}
            resetDataUser={resetDataUser}
          />
          <ModalDeleteDpm
            show={showModalDeleteDpm}
            setShow={setShowModalDeleteDpm}
            dataDeleteDpm={dataDeleteDpm}
            fetchDpmList={fetchDpmList}
          />
        </div>
      </div>
    </>
  );
};

export default Department;
