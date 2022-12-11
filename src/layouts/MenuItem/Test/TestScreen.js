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
        name: "Abnormal",
        key: "1",
        Abnormal: dataMatric?.current?.abnormal?.abnormal,
        Normal: dataMatric?.current?.abnormal?.normal,
      },
      {
        name: "Normal",
        key: "2",
        Abnormal: dataMatric.current.normal.abnormal,
        Normal: dataMatric.current.normal.normal,
      },
    ]);
  };

  // useEffect(() => {
  //   console.log('tung')
  // }, [dataMatric]);
  // console.log(dataTable)
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
                title="Abnormal"
                dataIndex="Abnormal"
              ></Table.Column>
              <Table.Column
                key="Normal"
                title="Normal"
                dataIndex="Normal"
              ></Table.Column>
            </Table>
            <h4>
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>&nbsp; &nbsp;</span>
              test
            </h4>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TestScreen;
