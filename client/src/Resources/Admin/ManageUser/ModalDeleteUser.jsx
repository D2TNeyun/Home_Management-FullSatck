import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { useState } from "react";
import { deleteUser } from "../../../Services/apiService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDeleteUser } = props;
  const handleClose = () => setShow(false);

  const handleSubmitBthConfirm = async () => {
    let data = await deleteUser(dataDeleteUser.id);
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
      <Modal
        show={show}
        onHide={handleClose}
        size="s"
        backdrop="static"
        className={cx("modalCreate-User")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete The User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user.{" "}
          <b>
            {dataDeleteUser && dataDeleteUser.email ? dataDeleteUser.email : ""}
          </b>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitBthConfirm()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
