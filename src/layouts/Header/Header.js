import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { useState } from "react";
import { logOut } from "../../utils/apiRequest";

import ChangePassword from "../../component/ChangePassword/ChangePassword";
import Search from "../../component/Search/Search";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Header() {
  const user = useSelector((state) => state.auth.login?.currentUser.user);
  const [visible, setVisible] = useState(false);
  const hide = () => setVisible(false);
  const onVisible = () => setVisible(!visible);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrap-search")}>
        <div>
          <Search />
        </div>
        <Tippy
          interactive
          visible={visible}
          onClickOutside={hide}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className={cx("option-user")} onClick={hide}>
                <ChangePassword />
                <button onClick={logOut}>Log out</button>
              </div>
            </div>
          )}
        >
          <div className={cx("user")} onClick={onVisible}>
            <FontAwesomeIcon icon={faUser} />
            <p>{user?.username}</p>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Header;
