import classNames from "classnames/bind";
import styles from "./Trophy.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateAward } from "../../../Services/apiService";
const cx = classNames.bind(styles);

const ModalUpdate = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
  };

  const [nameAward, setnameAward] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      console.log("check-----: ", dataUpdate);
      setnameAward( dataUpdate.nameAward !== null ? dataUpdate.nameAward : "");
    }
  }, [dataUpdate]);

  const handleSubmitSave = async () => {
    //callApi
    let data = await putUpdateAward(dataUpdate.id, nameAward);
    if (data && data.err === 0) {
      toast.success(data.mes);
      handleClose();
      await props.fetchTrophyList();
    }
    if (data && data.err !== 0) {
      toast.error(data.mes);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="m"
        backdrop="static"
        className={cx("modalCreate-User")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Laudatory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                <b>Laudatory</b>
              </label>
              <select
                className="form-select"
                onChange={(event) => setnameAward(event.target.value)}
                value={nameAward}
              >
                <option>Selected a Laudatory</option>
                <option value="Hoan Thanh">Hoan Thanh</option>
                <option value="Hoan Thanh Tot">Hoan Thanh Tot</option>
                <option value="Hoan Thanh Xuat Sac">Hoan Thanh Xuat Sac</option>
              </select>
            </div>
          </form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitSave()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdate;
