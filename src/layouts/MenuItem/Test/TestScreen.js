import { Button, Card, Col, Row, Upload, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Loading from "../../../component/Loading/Loading";

import axios from "axios";
import { baseApiPredict } from "../../../request/apiPredict";
import FormData from "form-data";

import { useState, useRef } from "react";
import { useEffect } from "react";

import classNames from "classnames/bind";
import styles from "./TestScreen.module.scss";
const cx = classNames.bind(styles);

function TestScreen() {
  const [dataMetricTest, setDataMetricTest] = useState();
  const [statusTestModal, setStstusTestModal] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [indexMatric, setIndexMatric] = useState();
  const [isLoadingUploađir, setIsLoadingUploađir] = useState(false);
  const [refesh, setrefesh] = useState(false);

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
        formData.name === "abnormal"
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
    setStstusTestModal(false);
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
    setStstusTestModal(true);

    const trueAbnormal = dataMatric?.current?.abnormal?.abnormal;
    const falseAbnormal = dataMatric?.current?.abnormal?.normal;

    const falseNormal = dataMatric?.current?.normal?.abnormal;
    const trueNormal = dataMatric?.current?.normal?.normal;

    //do do
    const accuracy =
      (trueAbnormal + trueNormal) /
      (trueAbnormal + falseAbnormal + falseNormal + trueNormal);

    const recall = trueAbnormal / (trueAbnormal + falseAbnormal);

    const sens = trueNormal / (trueNormal + falseNormal);

    const precision = trueAbnormal / (trueAbnormal + falseNormal);

    const f1 = (2 * precision * recall) / (precision + recall);

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

    setDataMetricTest([
      {
        name: "Độ chính xác",
        key: "1",
        kq: (accuracy * 100).toFixed(2),
      },
      {
        name: "Độ nhạy",
        kq: (recall * 100).toFixed(2),
      },
      {
        name: "Độ đặc hiệu",
        kq: (sens * 100).toFixed(2),
      },
      {
        name: "Precision",
        kq: (precision * 100).toFixed(2),
      },
      {
        name: "F1",
        kq: (f1 * 100).toFixed(2),
      },
    ]);
  };

  useEffect(() => {}, [dataTable]);

  return (
    <div className={cx("wraper")}>
      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ height: "500px", overflow: "auto" }} bordered={false}>
            <Upload
              //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              directory
              onChange={handleDirectory}
              showUploadList="false"
            >
              <Button icon={<UploadOutlined />}>Upload Directory</Button>
              {isLoadingUploađir && <Loading />}
            </Upload>
          </Card>
          <Button
            type="primary"
            onClick={handlTest}
            disabled={statusTestModal === false || isLoadingUploađir}
          >
            Thử nghiệm
          </Button>

          {/* <Button
            type="link"
            danger
            href="/predict"
          >
            Xóa
          </Button> */}
        </Col>
        <Col span={12}>
          <Card title="Kết quả thử nghiệm" bordered={false}>
            <Card title="Ma trận nhầm lẫn">
              <Table dataSource={dataTable} pagination={{ position: [] }}>
                <Table.Column
                  key="name"
                  title=""
                  dataIndex="name"
                ></Table.Column>
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
            </Card>
            {statusTestModal === false ? (
              <Loading />
            ) : (
              indexMatric?.accuracy &&
              statusTestModal && (
                <>
                  <Card
                    title={"Kết quả đánh giá:"}
                    style={{ marginTop: "30px" }}
                  >
                    <Table
                      dataSource={dataMetricTest}
                      pagination={{ position: [] }}
                    >
                      <Table.Column
                        key=""
                        title="Độ đo"
                        dataIndex="name"
                      ></Table.Column>
                      <Table.Column
                        key="kq"
                        title="Kết quả"
                        dataIndex="kq"
                      ></Table.Column>
                    </Table>
                  </Card>
                </>
              )
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TestScreen;
