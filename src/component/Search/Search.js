import useDebounce from "../../hooks/useDebounce";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
const cx = classNames.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const paramTask = useSelector((state) => state?.filterSlice?.paramTask);
  const valueSearch = useDebounce(searchText, 800);
  const handleSearchTextTask = (e) => setSearchText(e.target.value);

  useEffect(() => {
    // if (valueSearch === "") dispatch(getTasks(paramTask));
    // else {
    //   dispatch(getTasks({ ...paramTask, title: valueSearch }));
    // }
  }, [dispatch, paramTask, valueSearch]);

  return (
    <div className={cx("search")}>
      <input
        placeholder="Search task"
        className={cx("search-input", "search--height")}
        onChange={handleSearchTextTask}
      ></input>
    </div>
  );
}
export default Search;
