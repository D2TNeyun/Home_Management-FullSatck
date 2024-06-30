import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import styles from "./Department.module.scss";
import { deleteDpm } from "../../../Services/apiService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ModalDeleteDpm = (props) => {
  const { show, setShow, dataDeleteDpm } = props;

  const handleClose = () => setShow(false);

  const handleSubmitBthConfirm = async () => {
    let data = await deleteDpm(dataDeleteDpm.id);
    if (data && data.err === 0) {
      toast.success(data.mes);
      handleClose();
      await props.fetchDpmList();
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
          Are you sure you want to delete this.
          <b>
            {dataDeleteDpm && dataDeleteDpm.nameDepartment ? dataDeleteDpm.nameDepartment : ""}
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

export default ModalDeleteDpm;
