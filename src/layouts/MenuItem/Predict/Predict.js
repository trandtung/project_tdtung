import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import FormClientInfo from "./components/FormClientInfo";
import {
  Form,
  Button,
  Upload,
  Modal,
  Image,
  Card,
  Checkbox,
  Col,
  Row,
} from "antd";
import axios from "axios";
import FormData from "form-data";
import { baseApiPredict } from "../../../request/apiPredict";
import DrawImage from "../../DrawImage/DrawImage";

import {
  saveClientInfo,
  saveManyImage,
} from "../../../stores/slice/predictImgSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../component/Loading/Loading";

const FormDisabledDemo = () => {
  const dispatch = useDispatch();
  const { statePredictImg } = useSelector((state) => ({
    statePredictImg: state.predictImgSlice,
  }));

  const [statePredict, setStatePredict] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [listImgPredicted, setListImgPredicted] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [valuesFormClientInfo, setValuesFormClientInfo] = useState();
  const [modalFeedBack, setModalFeedBack] = useState(false);
  const handlePredict = async (values) => {
    setValuesFormClientInfo(values);
    let formData = new FormData();
    const listImg = selectedFile.map((item, index) => {
      return formData.append("file", item.originFileObj);
    });

    try {
      const response = await axios({
        method: "post",
        url: `${baseApiPredict}predict`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          setStatePredict(true);
          setListImgPredicted(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const listFile = (e) => {
    setSelectedFile(e.fileList);
  };

  const saveClient = async (values) => {
    const responseSaveImg = await dispatch(saveManyImage(listImgPredicted));
    values.dataImage = responseSaveImg.payload.data;
    const response = await dispatch(saveClientInfo(values));
    if (saveClientInfo.fulfilled.match(response)) {
      setStatePredict(false);
      setSelectedFile();
      setListImgPredicted([]);
    }
  };

  // const showModalF = () => {
  //   setModalFeedBack(true);
  // };
  const handleFeedBackImg = (data) => {
    console.log(data);
    setModalFeedBack(true);
  };
  return (
    <>
      {!statePredict ? (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handlePredict}
          autoComplete="off"
          // disabled={componentDisabled}
        >
          <Form.Item label="Upload" valuePropName="fileList">
            <Upload
              action={`${baseApiPredict}preview`}
              method="POSt"
              listType="picture-card"
              onPreview={handlePreview}
              onChange={listFile}
              multiple
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form.Item>
          {/* Client infomation form */}
          <FormClientInfo />
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Chẩn đoán
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <>
          <p>Chẩn đoán</p>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Form disabled
          </Checkbox>
          {/* Client infomation form */}
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            disabled={componentDisabled}
            initialValues={valuesFormClientInfo}
            onFinish={saveClient}
          >
            <FormClientInfo />

            <Row gutter={[16, 24]}>
              {listImgPredicted &&
                listImgPredicted.map((item, index) => (
                  <Col span={12} key={index}>
                    <Card
                      key={item.img}
                      // title="Card title"
                      bordered={false}
                      style={{ display: "flex" }}
                    >
                      <Image
                        src={`${baseApiPredict}${item.originImg}`}
                        width={500}
                        height={600}
                      />
                      <div>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </div>
                      <Button
                        disabled={false}
                        type={"primary"}
                        onClick={() => {
                          handleFeedBackImg(item);
                        }}
                      >
                        Phản hồi
                      </Button>
                    </Card>
                  </Col>
                ))}
            </Row>

            <Button type="primary" htmlType="submit" disabled={false}>
              Lưu thông tin
            </Button>
          </Form>
          {statePredictImg.isLoading && <Loading />}
          <Button
            type="primary"
            onClick={(e) => {
              setStatePredict(false);
              setSelectedFile();
              setListImgPredicted([]);
            }}
          >
            Kết nối mới
          </Button>

          <Modal
            title="Phản hồi ảnh"
            open={modalFeedBack}
            // onOk={handleOk}
            onCancel={() => {
              setModalFeedBack(false);
            }}
             width={550}
          >
            {/* <Image
                preview={false}
                src={`${baseApiPredict}${listImgPredicted[0].originImg}`}
                width={500}
                height={600}
              ></Image> */}
            <DrawImage />
          </Modal>
        </>
      )}
    </>
  );
};

export default () => <FormDisabledDemo />;
