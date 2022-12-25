import { Button, Card, Col, Row, Upload, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import axios from "axios";
import { baseApiPredict } from "../../../request/apiPredict";
import FormData from "form-data";

import { useState, useRef } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../component/Loading/Loading";

import classNames from "classnames/bind";
import styles from "./TestScreen.module.scss";
const cx = classNames.bind(styles);

function TestScreen() {
  // const dataa = [
  //   {
  //     name: "Chuẩn đoán có bệnh",
  //     key: "1",
  //     Precision: 0,
  //     Recall: 0,
  //     F1: 0,
  //   },
  //   {
  //     name: "Chuẩn đoán không bệnh",
  //     key: "2",
  //     Precision: 0,
  //     Recall: 0,
  //     F1: 0,
  //   },
  // ];
  const [dataMetricTest, setDataMetricTest] = useState();

  const [statusTestModal, setStstusTestModal] = useState(null);
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

    // abnormal
    const PrecisionTrueAb = (
      (trueAbnormal / (trueAbnormal + falseAbnormal)) *
      100
    ).toFixed(2);

    const RecallTrueAb = (
      (trueAbnormal / (trueAbnormal + falseNormal)) *
      100
    ).toFixed(2);

    //  normal
    const PrecisionFalseNor = (
      (trueNormal / (trueNormal + falseNormal)) *
      100
    ).toFixed(2);

    const RecallFalseNor = (
      (trueAbnormal / (trueAbnormal + falseAbnormal)) *
      100
    ).toFixed(2);

    const F1FalseNor = Number(
      (2 * Number(PrecisionFalseNor) * Number(RecallFalseNor)) /
        (Number(PrecisionFalseNor) + Number(RecallFalseNor))
    ).toFixed(2);

    // console.log(F1FalseNor);
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
        name: "Chuẩn đoán có bệnh",
        key: "1",
        Precision: PrecisionTrueAb,
        Recall: RecallTrueAb,
        F1: (
          ((2 *
            (trueAbnormal / (trueAbnormal + falseAbnormal)) *
            (trueAbnormal / (trueAbnormal + falseNormal))) /
            (trueAbnormal / (trueAbnormal + falseAbnormal) +
              trueAbnormal / (trueAbnormal + falseNormal))) *
          100
        ).toFixed(2),
      },
      {
        name: "Chuẩn đoán không bệnh",
        key: "2",
        Precision: PrecisionFalseNor,
        Recall: RecallFalseNor,
        F1: F1FalseNor,
      },
    ]);
  };

  useEffect(() => {
    const trueAbnormal = dataMatric?.current?.abnormal?.abnormal;
    const falseAbnormal = dataMatric?.current?.abnormal?.normal;

    const trueNormal = dataMatric?.current?.normal?.abnormal;
    const falseNormal = dataMatric?.current?.normal?.normal;
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
      // precision :
    });
  }, [dataTable]);

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
          <Button
            type="primary"
            onClick={handlTest}
            disabled={statusTestModal === false}
          >
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
            {statusTestModal == false ? (
              <Loading />
            ) : (
              indexMatric?.accuracy &&
              statusTestModal && (
                <>
                  <Card
                    title={"Đánh giá mô hình:"}
                    style={{ marginTop: "30px" }}
                  >
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
                    {/* <h4>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <span>&nbsp; &nbsp;</span>
                    F1 :%
                  </h4> */}

                    <Table
                      dataSource={dataMetricTest}
                      pagination={{ position: [] }}
                    >
                      <Table.Column
                        key=""
                        title=""
                        dataIndex="name"
                      ></Table.Column>
                      <Table.Column
                        key="Precision"
                        title="Precision"
                        dataIndex="Precision"
                      ></Table.Column>
                      <Table.Column
                        key="Recall"
                        title="Recall"
                        dataIndex="Recall"
                      ></Table.Column>
                      <Table.Column
                        key="F1"
                        title="F1"
                        dataIndex="F1"
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
