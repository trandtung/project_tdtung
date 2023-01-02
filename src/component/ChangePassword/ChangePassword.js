import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { messageLoginAuth } from "../../pages/Auth/constants";
import { changePasswordFailed } from "../../stores/slice/authSlice";
import { changePassword } from "../../stores/slice/authSlice";
import { loginUser } from "../../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataChangePw, setDatachangePw] = useState({
    currentPw: "",
    newPw: "",
    confirmpw: "",
  });
  // const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [errorChangpw, setErrorChangpw] = useState("");

  const { errorChangePassword, idUser } = useSelector((state) => ({
    errorChangePassword: state.auth.errorChangePassword,
    idUser: state?.auth?.login?.currentUser?.user._id,
  }));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log(dataChangePw,idUser);
    // const response = await dispatch(
    //   changePassword({...dataChangePw,id:idUser})
    // );
    // if (changePassword.fulfilled.match(response)) {
    //   handleClose();
    //   alert("Success");
    //   // loginUser({ username, password }, dispatch, navigate);
    // }
  };

  // useEffect(() => {
  //   dispatch(changePasswordFailed(""));
  //   setDisable(false);
  // }, [show, username, dispatch]);

  useEffect(() => {
    // password.length >= 6 ? setDisable(false) : setDisable(true);
    // if (dataChangePw.newPw != dataChangePw.confirmpw) {
    //   setErrorChangpw("Mật khẩu không trùng khớp");
    // }
  }, [dataChangePw]);

  return (
    <>
      <button onClick={handleShow}>Đổi mật khẩu</button>
      <Modal show={show} onHide={handleClose}>
        <div className={cx("wrap-changepw")}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mật khẩu hiện tại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                required
                onChange={(e) =>
                  setDatachangePw({
                    ...dataChangePw,
                    currentPw: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setDatachangePw({
                    ...dataChangePw,
                    newPw: e.target.value,
                  })
                }
              />
              {disable && (
                <label className="text-error">
                  {messageLoginAuth.MIN_6CHAR}
                </label>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Xác thực mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                onChange={(e) =>
                  setDatachangePw({
                    ...dataChangePw,
                    confirmpw: e.target.value,
                  })
                }
              />
              {disable && (
                <label className="text-error">
                  {messageLoginAuth.MIN_6CHAR}
                </label>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleChangePassword}
              disabled={disable}
            >
              Thay đổi
            </Button>
            <label className="text-error">{errorChangpw}</label>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default ChangePassword;
