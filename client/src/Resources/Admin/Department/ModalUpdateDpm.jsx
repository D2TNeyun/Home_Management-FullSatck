import classNames from "classnames/bind";
import styles from "./Department.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { ImSpinner5 } from "react-icons/im";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateDpm } from "../../../Services/apiService";
const cx = classNames.bind(styles);

const ModalUpdateDpm = (props) => {
  const { show, setShow, dataUpdateDpm } = props;

  const handleClose = () => {
    setShow(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [nameDepartment, setNameDepartment] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdateDpm)) {
      console.log("UpdateDpm: ", dataUpdateDpm);
      setNameDepartment(dataUpdateDpm.nameDepartment);
    }
  }, [dataUpdateDpm]);

  const handleSubmitSave = async () => {
    setIsLoading(true);
    //callApi
    let data = await putUpdateDpm(dataUpdateDpm.id, nameDepartment);
    if (data && data.err === 0) {
      toast.success(data.mes);
      setIsLoading(false);
      handleClose();
      await props.fetchDpmList();
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
          <Modal.Title>Update a Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label"><b>Name Department</b></label>
              <input
                type="name"
                className="form-control"
                value={nameDepartment}
                onChange={(event) => setNameDepartment(event.target.value)}
              />
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
            disabled={isLoading}
          >
            {isLoading === true && <ImSpinner5 className={cx("spinner")} />}
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateDpm;
