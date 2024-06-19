import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { useState, useEffect } from "react";
import { putUpdateUser, getDepartment } from "../../../Services/apiService";

import _ from "lodash";

const cx = classNames.bind(styles);

const ModalViewUser = (props) => {
  const { show, setShow, selectedUser } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("Nhan vien");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");
  // const [role, setRole] = useState("AD");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const fetchListDepartment = async () => {
    // TODO: Fetch list department
    try {
      let res = await getDepartment();
      console.log("Department", res);
      if (res && res.err === 0 && res.Data && Array.isArray(res.Data.rows)) {
        setDepartments(res.Data.rows);
      }
    } catch (error) {
      //   console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchListDepartment();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(selectedUser)) {
      console.log("selectedUser -->", selectedUser);
      setEmail(selectedUser.email);
      setUsername(selectedUser.username);
      setPosition(
        selectedUser.position !== null ? selectedUser.position : ""
      );
      setSelectedDepartment(selectedUser.id_Department || "");
      setAvatar(selectedUser.avatar);
      setPreview(`${selectedUser.avatar}`);
    }
  }, [selectedUser]);


  const handleClose = () => {
    setShow(false);
    setPreview("");
    setUsername("");
    setEmail("");
    setPosition("");
    setAvatar("");
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
          <Modal.Title>Information a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={cx("Detail-Container")}>
            <div className={cx("Detail-avatar")}>
              <div className={cx("img-preview")}>
                {preview ? (
                  <img className={cx("preview")} src={preview} />
                ) : (
                  <span className={cx("preview")}>Preview Avatar</span>
                )}
              </div>
            </div>
            <div className={cx("row Detail-content")}>
              <div className="col-md-6">
                <label className="form-label">Username:</label>
                <input
                  type="Username"
                  className="form-control"
                  value={username}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Position:</label>
                <input
                  type="email"
                  className="form-control"
                  value={position}
                  disabled
                />
              </div>
              <div className="col-md-6">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                onChange={(event) => setSelectedDepartment(event.target.value)}
                value={selectedDepartment}
                disabled
              >
                <option value="">Select a department</option>
                {departments && departments.length > 0 ? (
                  departments.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nameDepartment}
                    </option>
                  ))
                ) : (
                  <option value="">No departments available</option>
                )}
              </select>
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

export default ModalViewUser;
