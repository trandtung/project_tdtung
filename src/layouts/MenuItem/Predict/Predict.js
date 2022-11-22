import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Modal,
} from "antd";
import axios from "axios";
import FormData from "form-data";
import { baseApiPredict } from "../../../request/apiPredict";
const { TextArea } = Input;
const formData = new FormData();

const FormDisabledDemo = () => {
  const [statePredict, setStatePredict] = useState(false);
  const [listImgPredicted, setListImgPredicted] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [componentDisabled, setComponentDisabled] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  console.log(listImgPredicted)
  const handlePredict = async () => {
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
  return (
    <>
      {!statePredict ? (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          onFinish={handlePredict}
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

          <Form.Item label="Radio">
            <Radio.Group>
              <Radio value="apple"> Apple </Radio>
              <Radio value="pear"> Pear </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Input">
            <Input />
          </Form.Item>

          <Form.Item label="InputNumber">
            <InputNumber />
          </Form.Item>
          <Form.Item label="TextArea">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Chẩn đoán
            </Button>
          </Form.Item>

          {/* <input type="file" onChange={handleFileSelect}/> */}
        </Form>
      ) : (
        <>
          {listImgPredicted &&
            listImgPredicted.map((item, index) => (
              <img
                key={item.img}
                src={`${baseApiPredict}${item.img}`}
                width="500"
                height="600"
              ></img>
            ))}
          <Button type="primary">Kết nối mới</Button>
        </>
      )}
    </>
  );
};

export default () => <FormDisabledDemo />;
