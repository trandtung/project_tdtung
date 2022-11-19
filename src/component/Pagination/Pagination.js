import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import filterSlice from "../../stores/slice/searchSlice";

import styles from "./Pagination.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function PaginatedItems() {
  const dispatch = useDispatch();
  const { meta, paramTask } = useSelector((state) => ({
    meta: state.taskSlice.meta,
    paramTask: state.filterSlice.paramTask,
  }));

  const pages = [];
  for (let i = 1; i <= meta.totalPages; i++) {
    pages.push(i);
  }
  const listPages = pages.map((page) => (
    <li
      key={page}
      className={cx("page-item", "cursorPointer")}
      onClick={() => {
        onPageChange(page, false);
      }}
    >
      <p
        className={cx("page-link", meta.currentPage === page ? "active" : null)}
      >
        {page}
      </p>
    </li>
  ));

  const onPageChange = async (page, stateNextPre) => {
    stateNextPre
      ? await dispatch(
          filterSlice.actions.setCurrentPage(paramTask.page + page)
        )
      : await dispatch(filterSlice.actions.setCurrentPage(page));
  };

  return (
    <>
      <div className={cx("pagi")}>
        <ul className={cx("pagination")}>
          {meta.currentPage > 1 && (
            <li className={cx("page-pre")}>
              <button
                className={cx("page-link")}
                disabled={meta.currentPage <= 1}
                onClick={() => {
                  onPageChange(-1, true);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </li>
          )}
          {listPages}
          {meta.currentPage < meta.totalPages && (
            <li className={cx("page-next")}>
              <button
                clbuttonsname={cx("page-link")}
                onClick={() => {
                  onPageChange(1, true);
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
export default memo(PaginatedItems);
