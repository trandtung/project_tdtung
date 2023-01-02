import { Space } from "antd";
import Card from "antd/es/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import PieImage from "./components/PieImage";
import moment from "moment/moment";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeedback,
  getTotalClient,
  getTotalImg,
} from "../../../stores/slice/homeSlice";
import DemoColumn from "./components/PieImage";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function HomePage() {
  const dispatch = useDispatch();
  const { listFeedback, totalClient, totalImg } = useSelector((state) => ({
    listFeedback: state.homeslice?.listFeedback,
    totalClient: state.homeslice?.totalClient,
    totalImg: state.homeslice?.totalImg,
  }));

  useEffect(() => {
    dispatch(getFeedback());
    dispatch(getTotalClient());
    dispatch(getTotalImg());
  }, []);

  const formatDate = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      "  " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card>
          <div className={cx("info_statistical")}>
            <div className={cx("info_statistical_item")}>
              <p className={cx("info_statistical_item--number")}>
                {totalClient}
              </p>
              <p>Tổng số bệnh nhân</p>
            </div>
            <div className={cx("info_statistical_item")}>
              <p className={cx("info_statistical_item--number")}>{totalImg}</p>
              <p>Tổng số ảnh bệnh nhân</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className={cx("info_statistical_feedBack")}>
            {/* <div> */}
              <DemoColumn />
              {/* <b>Thống kê lượt chẩn đoán</b> */}
            {/* </div> */}
            <div className={cx("info_statistical_history")}>
              <Card
                title="Phản hồi gần đây:"
                // extra={<a href="#">More</a>}
                style={{ width: 480 }}
              >
                <div>
                  {listFeedback?.map((item, index) => (
                    <Card
                      key={item.id}
                      title="Đã phản hồi ảnh của bệnh nhân:"
                      extra={
                        <div>
                          <Link to={`/clients/${item._id}`}>Chi tiết</Link>
                        </div>
                      }
                      style={{ marginBottom: "20px" }}
                    >
                      <p>
                        <b>Bệnh nhân : </b>
                        {item.name}
                      </p>
                      <p>
                        <b>Ngày giờ : </b>{" "}
                        {formatDate(new Date(item?.createdAt))}
                      </p>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </Space>
    </>
  );
}

export default HomePage;
