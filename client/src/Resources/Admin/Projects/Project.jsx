import classNames from "classnames/bind";
import styles from "./Project.module.scss";
import { useEffect, useState } from "react";
import { getAllProject } from "../../../Services/apiService";
import TableProject from "./GettAll";
import { FcPlus } from "react-icons/fc";
import ModalViewProject from "./ModalViewProject";
import ModalAddTrophy from "./ModalAddTrophy";

// import ModalUpdateProject from "./ModalUpdateProject";
// import ModalDeleteProject from "./ModalDeleteProject";

const cx = classNames.bind(styles);
const Project = (props) => {
  const [listProject, setListProject] = useState([]);

  const [dataAddTrophy, setDataAddTrophy] = useState({});
  const [selectedProject, setselectedProject] = useState({});

  const [showModalView, setShowModalView] = useState(false);
  const [showModalAddTrophy, setShowModalAddTrophy] = useState(false);

  const fetchProjectList = async () => {
    try {
      let res = await getAllProject();
      console.log("Project", res);
      if (res.err === 0) {
        setListProject(res.Data.rows);
      }
    } catch (error) {
      console.error("Failed to fetch Project list:", error);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const handeView = (project) => {
    setShowModalView(true);
    setselectedProject(project);
  }

  const handleAddTrophy = (project) => {
    setShowModalAddTrophy(true);
    setDataAddTrophy(project);
  }
 
  const resetDataUser = () => {
    setDataUpdateProject({});
    // setSelectedUser({});
  };
  return (
    <>
      <div className={cx("Project-container")}>
        <div className={cx("title")}><b>List Project</b></div>
        <div className={cx("Project-content")}>
          
          <div className={cx("table-Project")}>
            <TableProject
              listProject={listProject}
              handeView={handeView}
              handleAddTrophy={handleAddTrophy}
            />
          </div>
          <ModalViewProject
            show={showModalView}
            setShow={setShowModalView}
            selectedProject={selectedProject}
          />
          <ModalAddTrophy
            show={showModalAddTrophy}
            setShow={setShowModalAddTrophy}
            dataAddTrophy={dataAddTrophy}
            fetchProjectList={fetchProjectList}
          />
        </div>
      </div>
    </>
  );
};

export default Project;
