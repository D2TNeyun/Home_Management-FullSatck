import classNames from "classnames/bind";
import styles from "./userHome.module.scss";
import {
  MailOutlined,
  InstagramOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const cx = classNames.bind(styles);

const UserHomePage = () => {
  return (
    <>
      <div className={cx("container")}>
        <div className={cx("title")}> Have a good day!! </div>
        <div className={cx("contact")}>
          Please contact us when you need help!!!
        </div>

        <div className={cx("form-contact")}>
          <div className="card mb-4 mb-lg-0 border-0">
            <div className="card-body">
              <hr />
              <div className="row">
                <div className="col-sm-4">
                  <p className={cx("textProfile")}> <MailOutlined />  Email </p>
                </div>
                <div className="col-sm-4">
                  <p className={cx("textProfile")}>nguyendanh.st03@gmail.com</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">
                  <p className={cx("textProfile")}><PhoneOutlined /> PHONE</p>
                </div>
                <div className="col-sm-4">
                  <p className={cx("textProfile")}>038 5500 502</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-4">
                  <p className={cx("textProfile")}><InstagramOutlined /> INSTAGRAM</p>
                </div>
                <div className="col-sm-4">
                  <p className={cx("textProfile")}>im.neyugahh</p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHomePage;
