import classNames from "classnames/bind";
import styles from "./MyProject.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import _ from "lodash";

const cx = classNames.bind(styles);

const ViewMyProject = (props) => {
  const { show, setShow, selectedProject } = props;

  const [nameDtnk, setNameDtnk] = useState();
  const [preview, setPreview] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState();

  useEffect(() => {
    if (!_.isEmpty(selectedProject)) {
      setNameDtnk(selectedProject.nameDtnk);
      setPreview(selectedProject.preview);
      setDescription(selectedProject.description);
      setImg(selectedProject.img);
    }
  }, [selectedProject]);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className={cx("modalView-User")}
      >
        <Modal.Header closeButton>
          <Modal.Title>View project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={cx("view-container")}>
            <div className={cx("view-avatar")}>
              <div className={cx("img-preview")}>
                {selectedProject && selectedProject.img ? (
                  <img
                    className={cx("preview")}
                    src={selectedProject.img}
                    alt="Avatar"
                  />
                ) : (
                  <span className={cx("preview")}>Avatar</span>
                )}
              </div>
            </div>
            <div className={cx("view-content")}>
              <div className="card mb-4 mb-lg-0 border-0">
                <div className="card-body">
                  <hr />
                  <div className="row">
                    <div className="col-sm-4">
                      <p className={cx("textview")}>Name Project</p>
                    </div>
                    <div className="col-sm-8">
                      <p className={cx("textview")}>
                        {selectedProject?.nameDtnk}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4">
                      <p className={cx("textview")}>Description</p>
                    </div>
                    <div className="col-sm-8">
                      <p className={cx("textview")}>
                        {selectedProject?.description}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewMyProject;
