import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import styles from "./Trophy.module.scss";
import { deleteAward } from "../../../Services/apiService";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ModalDelete = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitBthConfirm = async () => {
    let data = await deleteAward(dataDelete.id);
    if (data && data.err === 0) {
      toast.success(data.mes);
      handleClose();
      await props.fetchTrophyList();
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
          <Modal.Title>Confirm delete Laudatory?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this.
          <b>
            {dataDelete && dataDelete?.Dtnk?.nameDtnk ? dataDelete?.Dtnk?.nameDtnk : ""}
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

export default ModalDelete;
