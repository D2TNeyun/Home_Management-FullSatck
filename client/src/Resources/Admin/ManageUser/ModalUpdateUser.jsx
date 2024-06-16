import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import { putUpdateUser, getDepartment } from "../../../Services/apiService";

import _ from "lodash";
const cx = classNames.bind(styles);

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdateUser } = props;

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
    if (!_.isEmpty(dataUpdateUser)) {
      console.log("dataUpdateUser", dataUpdateUser);
      setEmail(dataUpdateUser.email);
      setUsername(dataUpdateUser.username);
      setPosition(
        dataUpdateUser.position !== null ? dataUpdateUser.position : ""
      );
      setSelectedDepartment(dataUpdateUser.id_Department || "");
      setAvatar(dataUpdateUser.avatar);
      setPreview(`${dataUpdateUser.avatar}`);
    }
  }, [dataUpdateUser]);

  const handleUploadAvatar = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setAvatar(event.target.files[0]);
    } else {
      // setPreview("");
    }
  };

  const handleSubmitUpdateUser = async () => {
    //Api
    let data = await putUpdateUser(
      dataUpdateUser.id,
      position,
      username,
      avatar,
      selectedDepartment
    );
    if (data && data.err === 0) {
      toast.success(data.mes);
      handleClose();
      await props.fetchUserList() && props.fetchUserList();
    }
    if (data && data.err !== 0) {
      toast.error(data.mes);
    }
  };
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setPosition("Nhan vien");
    setSelectedDepartment("");
    setAvatar("");
    setPreview("");
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        demo modal
      </Button> */}
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className={cx("modalCreate-User")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="requied email use gmail.com"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="requied passwd min is 6"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Position</label>
              <select
                className="form-select"
                onChange={(event) => setPosition(event.target.value)}
                value={position}
              >
                <option>...</option>
                <option value="Nhan vien">Nhan vien</option>
                <option value="Giam doc">Giam doc</option>
                <option value="Truong phong">Truong phong</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                onChange={(event) => setSelectedDepartment(event.target.value)}
                value={selectedDepartment}
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
            <div className={cx("upload-avatar")}>
              <label className={cx("label-upload")} htmlFor="labelUpload">
                <FcPlus /> Upload Avatar
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUploadAvatar(event)}
              />
            </div>
            <div className={cx("img-preview")}>
              {preview ? (
                <img className={cx("preview")} src={preview} />
              ) : (
                <span className={cx("preview")}>Preview Avatar</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
