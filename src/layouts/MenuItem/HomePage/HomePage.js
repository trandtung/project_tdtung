import { Space } from "antd";
import Card from "antd/es/card/Card";
import PieImage from "./components/PieImage";

import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
const cx = classNames.bind(styles);

function HomePage() {
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card>
          <div className={cx("info_statistical")}>
            <div className={cx("info_statistical_item")}>
              <p className={cx("info_statistical_item--number")}>30</p>
              <p>Tổng số bệnh nhân</p>
            </div>
            <div className={cx("info_statistical_item")}>
              <p className={cx("info_statistical_item--number")}>30</p>
              <p>Tổng số ảnh có thông tin</p>
            </div>
            <div className={cx("info_statistical_item")}>
              <p className={cx("info_statistical_item--number")}>30</p>
              <p>Tổng số ảnh không có thông tin</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className={cx("info_statistical_feedBack")}>
            <PieImage />
            <div className={cx("info_statistical_history")}>
              <Card
                title="Chẩn đoán gần đây:"
                // extra={<a href="#">More</a>}
                style={{ width: 480 }}
              >
                <div>
                  <Card
                    title="Đã chẩn đoán bệnh nhân"
                    extra={
                      <a href="http://localhost:3000/clients/638760223cca754ed651ad4d">
                        Chi tiết
                      </a>
                    }
                    // style={{ width: 100 }}
                  >
                    <p>Trần Đức Tùng</p>
                    <p>Ngày tháng năm</p>
                    <p>Card content</p>
                  </Card>
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
