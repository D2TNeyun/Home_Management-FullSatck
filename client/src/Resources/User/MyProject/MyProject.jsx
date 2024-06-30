import classNames from "classnames/bind";
import styles from "./MyProject.module.scss";
import { getAllMyProject } from "../../../Services/apiService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";

import TableMyProject from "./GetMyProject";
import ModalCreateProject from "./ModalCreateProject";
import ViewMyProject from "./ViewMyProject";

const cx = classNames.bind(styles);

const MyProject = () => {
  const id_User = useSelector((state) => state.user.user?.inforUser?.id);
  const [dataProject, setDataProject] = useState([]);

  const [showModalCreateProject, setShowModalCreateProject] = useState(false);
  const [showModalView, setShowModalView] = useState(false);

  const [selectedProject, setSelectedProject] = useState({});

  const fetchDataProject = async () => {
    try {
      let res = await getAllMyProject(id_User);
      // console.log("Data view", res); // Kiểm tra giá trị trả về của getAllUser
      if (res.err === 0) {
        setDataProject(res.Data.rows);
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };

  useEffect(() => {
    fetchDataProject();
    // fetchProject();
  }, []);

  const handeView = (project) => {
    setShowModalView(true);
    setSelectedProject(project);
  }

  return (
    <>
  <div className={cx("Project-container")}>
        <div className={cx("tille")}>List my Project</div>
        <div className={cx("Project-content")}>
          <div className={cx("btn-Project")}>
            <button
              className={cx("btn-add")}
              onClick={() => setShowModalCreateProject(true)}
            >
              <FcPlus /> Add Project
            </button>
          </div>
          <div className={cx("table-Project")}>
            <TableMyProject
              dataProject={dataProject}
              handeView={handeView}
            />
          </div>
          <ModalCreateProject
          show={showModalCreateProject}
          setShow={setShowModalCreateProject}
          fetchDataProject={fetchDataProject}
          />
          <ViewMyProject
            show={showModalView}
            setShow={setShowModalView}
            selectedProject={selectedProject}
          />
        </div>
      </div>
    </>
  );
};

export default MyProject;
