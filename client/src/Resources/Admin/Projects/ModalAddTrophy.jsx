import classNames from "classnames/bind";
import styles from "./Project.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import _ from "lodash";
import { postAddAward } from "../../../Services/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ModalAddTrophy = (props) => {
  const { show, setShow, dataAddTrophy } = props;
  const id_user = dataAddTrophy.id_User
  const id_Dtnk = dataAddTrophy.id;
  const [nameAward, setAward] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dataAddTrophy)) {
      console.log("-----check", dataAddTrophy);
      setAward(dataAddTrophy.nameAward !== null ? dataAddTrophy.nameAward : "");
    }
  }, [dataAddTrophy]);
  const handleClose = () => {
    setShow(false);
  };

  const handleSubmitSave = async () => {
    // call api
    let data = await postAddAward(id_user, id_Dtnk, nameAward);
    if (data && data.err === 0) {
      toast.success(data.mes);
      handleClose();
      await props.fetchProjectList();
    } else {
      toast.error(data.mes);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="m"
        backdrop="static"
        className={cx("modalView-User")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Laudatory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to add rewards this project,
          <b>
            {dataAddTrophy && dataAddTrophy.nameDtnk ? dataAddTrophy.nameDtnk: ""}?
          </b>
          <div className={cx("form-award")}>
            <label className="form-label">
              <b>Remuneration</b>
            </label>
            <select
              className="form-select"
              onChange={(event) => setAward(event.target.value)}
              value={nameAward}
            >
              <option>Selected a Laudatory</option>
              <option value="Hoan Thanh">Hoan Thanh</option>
              <option value="Hoan Thanh Tot">Hoan Thanh Tot</option>
              <option value="Hoan Thanh Xuat Sac">Hoan Thanh Xuat Sac</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddTrophy;
