// import { Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientDetail,
  getClients,
  updateClient,
} from "../../../../stores/slice/tableClientSlice";
import FormClientInfo from "../../Predict/components/FormClientInfo";

import { Form, Input, Radio, InputNumber, Modal } from "antd";
import { useRef } from "react";
const { TextArea } = Input;

function ModalUpdateClient({ isModalOpen, handleCancel }) {
  const dispatch = useDispatch();
  const [dataClientDetail, setDataClientDetail] = useState();
  const { clientDetail, isLoading } = useSelector((state) => ({
    clientDetail: state.tableClientSlice?.clientDetail,
    isLoading: state.tableClientSlice?.isLoading,
  }));

  const data = useRef();

  useEffect(() => {
    setDataClientDetail(clientDetail);
  }, [clientDetail?._id]);

  const handelUpdateClient = async () => {
    const data = {
      name: dataClientDetail.name,
      age: dataClientDetail.age,
      gender: dataClientDetail.gender,
      address: dataClientDetail.address,
      description: dataClientDetail.description,
    };
    // console.log({ id: dataClientDetail._id, data: data });
    const res = await dispatch(
      updateClient({ id: dataClientDetail._id, data: data })
    );
    if (updateClient.fulfilled.match(res)) {
      dispatch(getClients())
      alert("Success");
      handleCancel();
    }
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handelUpdateClient}
        width={700}
      >
        {/* {clientDetail && ( */}
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          // disabled={true}
          // initialValues={data.current}
          // onValuesChange={handleChangeInfo}
        >
          <Form.Item
            label="Họ tên"
            // name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              value={dataClientDetail?.name}
              onChange={(e) => {
                setDataClientDetail({
                  ...dataClientDetail,
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Tuổi">
            <InputNumber
              value={dataClientDetail?.age}
              onChange={(e) => {
                setDataClientDetail({
                  ...dataClientDetail,
                  age: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group
              value={dataClientDetail?.gender}
              onChange={(e) => {
                setDataClientDetail({
                  ...dataClientDetail,
                  gender: e.target.value,
                });
              }}
            >
              <Radio value="Nam"> Nam </Radio>
              <Radio value="Nữ"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            // name="address"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              value={dataClientDetail?.address}
              onChange={(e) => {
                setDataClientDetail({
                  ...dataClientDetail,
                  address: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <TextArea
              rows={4}
              value={dataClientDetail?.description}
              onChange={(e) => {
                setDataClientDetail({
                  ...dataClientDetail,
                  description: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Form>
        {/* )} */}
      </Modal>
    </>
  );
}

export default ModalUpdateClient;
