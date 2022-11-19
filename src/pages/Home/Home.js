import Header from "../../layouts/Header/Header";
import LayoutDefault from "../../layouts/LayoutDefault/LayoutDefault";

import { getCategories } from "../../stores/slice/categoriesSlice";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();
  let location = useLocation();
  console.log(location);
  // const fetchCategories = useCallback(async () => {
  //   await dispatch(getCategories());
  // }, [dispatch]);

  // useEffect(() => {
  //   fetchCategories();
  // }, [fetchCategories]);
  return (
    <>
      <Header />
      <div className={cx("container")}>
        <LayoutDefault>
          <Outlet />
          {/* {location.pathname} */}
        </LayoutDefault>
      </div>
    </>
  );
}

export default Home;
