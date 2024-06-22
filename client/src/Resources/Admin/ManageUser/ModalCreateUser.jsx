import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../Services/apiService";
const cx = classNames.bind(styles);

const ModalCreateUser = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    // setUsername("");
    // setPosition("Nhan vien");
    // setRole("Admin");
    setAvatar("");
    setPreview("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [position, setPosition] = useState("Nhan vien");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");
  // const [role, setRole] = useState("AD");

  //toaster

  const handleUploadAvatar = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setAvatar(event.target.files[0]);
    } else {
      // setPreview("");
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email is not valid");
      return;
    }
    if (!password) {
      toast.error("Password is not valid");
      return;
    }
    if (!avatar) {
      toast.error("Avatar is not valid");
      return;
    }
    //tApi
    let data = await postCreateNewUser(email, password, avatar);
    if (data && data.err === 0) {
      toast.success(data.mes);
      handleClose();
      await props.fetchUserList();
    }
    if (data && data.err !== 0) {
      toast.error(data.mes);
    }
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
          <Modal.Title>Add new User</Modal.Title>
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
                onChange={(event) => setPassword(event.target.value)}
              />
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
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
