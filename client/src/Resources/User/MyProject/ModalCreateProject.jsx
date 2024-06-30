import classNames from "classnames/bind";
import styles from "./MyProject.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { ImSpinner5 } from "react-icons/im";
import { toast } from "react-toastify";
import { postCreateProject } from "../../../Services/apiService";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const ModalCreateProject = (props) => {
  const id_User = useSelector((state) => state.user.user?.inforUser?.id);
  const { show, setShow } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [nameDtnk, setNameDtnk] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState("");

  const handleClose = () => {
    setShow(false);
    setNameDtnk("");
    setDescription("");
    setImg("");
    setPreview("");
  };

  const handleUploadImg = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImg(event.target.files[0]);
    } else {
      // setPreview("");
    }
  };
  

  const handleSubmitCreate = async () => {
    setIsLoading(true);
    //callApi
    let data = await postCreateProject(id_User, nameDtnk, description, img);
    if (data && data.err === 0) {
      toast.success(data.mes);
      setIsLoading(false);
      handleClose();
      await props.fetchDataProject();
    }
    if (data && data.err !== 0) {
      toast.error(data.mes);
      setIsLoading(false);
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
          <Modal.Title>Add a Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row">
            <div className={cx("container")}>
              <div className={cx("upload-img")}>
                <div className={cx("upload")}>
                  <label className={cx("label-upload")} htmlFor="labelUpload">
                    <FcPlus /> Upload Image
                  </label>
                  <input
                    type="file"
                    hidden
                    id="labelUpload"
                    onChange={(event) => handleUploadImg(event)}
                  />
                </div>
                <div className={cx("img-preview")}>
                  {preview ? (
                    <img className={cx("preview")} src={preview} />
                  ) : (
                    <span className={cx("preview")}>Preview Img</span>
                  )}
                </div>
              </div>
              <div className={cx("content")}>
                <div className="col-md-6">
                  <label className="form-label">Name Project</label>
                  <input
                    type="nameproject"
                    className="form-control"
                    value={nameDtnk}
                    onChange={(event) => setNameDtnk(event.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="10"
                    type="Description"
                    className={cx("textarea-control")}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmitCreate()}
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

export default ModalCreateProject;
