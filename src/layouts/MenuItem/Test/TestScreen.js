import { Button, Card, Col, Row, Upload, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import axios from "axios";
import { baseApiPredict } from "../../../request/apiPredict";
import FormData from "form-data";

import { useState, useRef } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./TestScreen.module.scss";
const cx = classNames.bind(styles);

function TestScreen() {
  const [dataTable, setDataTable] = useState([]);
  const [indexMatric, setIndexMatric] = useState();
  const listImage = useRef();
  const dataMatric = useRef({ abnormal: {}, normal: {} });
  const handleDirectory = async (e) => {
    listImage.current = e.fileList;
  };

  const matricPredict = async (formData) => {
    await axios({
      method: "post",
      url: `${baseApiPredict}predict/folder`,
      data: formData.listImg,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        formData.name == "abnormal"
          ? (dataMatric.current = {
              ...dataMatric.current,
              abnormal: response.data,
            })
          : (dataMatric.current = {
              ...dataMatric.current,
              normal: response.data,
            });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlTest = async () => {
    let abnormalData = new FormData();
    let normalData = new FormData();
    const listImg = listImage.current.map((item, index) => {
      if (item.originFileObj.webkitRelativePath.includes("/abnormal/")) {
        abnormalData.append("file", item.originFileObj);
      } else {
        normalData.append("file", item.originFileObj);
      }
    });
    const dataMatricAbnormal = await matricPredict({
      name: "abnormal",
      listImg: abnormalData,
    });
    const dataMatricNormal = await matricPredict({
      name: "normal",
      listImg: normalData,
    });
    setDataTable([
      {
        name: "Chuẩn đoán có bệnh",
        key: "1",
        Abnormal: dataMatric?.current?.abnormal?.abnormal,
        Normal: dataMatric?.current?.normal?.abnormal,
      },
      {
        name: "Chuẩn đoán không bệnh",
        key: "2",
        Abnormal: dataMatric?.current?.abnormal?.normal,
        Normal: dataMatric.current.normal.normal,
      },
    ]);
  };

  useEffect(() => {
    setIndexMatric({
      accuracy:
        (dataMatric?.current?.abnormal?.abnormal +
          dataMatric.current.normal.normal) /
        (dataMatric?.current?.abnormal?.abnormal +
          dataMatric?.current?.normal?.abnormal +
          dataMatric?.current?.abnormal?.normal +
          dataMatric.current.normal.normal),
      sens:
        dataMatric?.current?.abnormal?.abnormal /
        (dataMatric?.current?.abnormal?.abnormal +
          dataMatric?.current?.abnormal?.normal),
      spec:
        dataMatric.current.normal.normal /
        (dataMatric.current.normal.normal +
          dataMatric?.current?.normal?.abnormal),
    });
  }, [dataTable]);

  console.log(indexMatric);
  return (
    <div className={cx("wraper")}>
      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ height: "500px", overflow: "auto" }} bordered={false}>
            <Upload
              //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              directory
              onChange={handleDirectory}
            >
              <Button icon={<UploadOutlined />}>Upload Directory</Button>
            </Upload>
          </Card>
          <Button type="primary" onClick={handlTest}>
            Thử nghiệm
          </Button>
        </Col>
        <Col span={12}>
          <Card title="Kết quả thử nghiệm" bordered={false}>
            <Table dataSource={dataTable} pagination={{ position: [] }}>
              <Table.Column key="name" title="" dataIndex="name"></Table.Column>
              <Table.Column
                key="Abnormal"
                title="Bệnh"
                dataIndex="Abnormal"
              ></Table.Column>
              <Table.Column
                key="Normal"
                title="Không bệnh"
                dataIndex="Normal"
              ></Table.Column>
            </Table>
            {indexMatric?.accuracy && (
              <>
                <h4>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>&nbsp; &nbsp;</span>
                  Độ chính xác : {(indexMatric.accuracy * 100).toFixed(2)} %
                </h4>

                <h4>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>&nbsp; &nbsp;</span>
                  Độ nhạy : {(indexMatric.sens * 100).toFixed(2)}%
                </h4>
                <h4>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>&nbsp; &nbsp;</span>
                  Độ đặc hiệu : {(indexMatric.spec * 100).toFixed(2)}%
                </h4>
                <h4>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>&nbsp; &nbsp;</span>
                  F1 :%
                </h4>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TestScreen;
