import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Checkbox,
  Card,
  Modal,
} from "antd";
import { useSelector } from "react-redux";
import Password from "antd/es/input/Password";
import { useDispatch } from "react-redux";
import { changeInfomationUser, getUser } from "../../../stores/slice/authSlice";
import { useEffect } from "react";

function Account() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth?.login?.currentUser.user,
  }));
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditAccount = async (values) => {
    const response = await dispatch(
      changeInfomationUser({ data: values, id: currentUser._id })
    );
    // console.log(response);
    if (changeInfomationUser.fulfilled.match(response)) {
      dispatch(getUser({ id: currentUser._id }));
      alert("Success");
    }
  };

  return (
    <>
      <Card>
        <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Sửa thông tin
        </Checkbox>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 9 }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          disabled={componentDisabled}
          initialValues={currentUser}
          onFinish={handleEditAccount}
        >
          <Form.Item label="Tên người dùng" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Radio.Group>
              <Radio value="Nam"> Nam </Radio>
              <Radio value="Nữ"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <DatePicker />
          </Form.Item>

          <Form.Item label="Lưu">
            <Button type="primary" htmlType="submit">
              Thay đổi
            </Button>
          </Form.Item>
        </Form>

        <Button type="primary" onClick={showModal}>
          Đổi mật khẩu
        </Button>
        <Modal
          open={isModalOpen}
          closable={false}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
            <Form.Item label="Mật khẩu cũ" name="password">
              <Input type="password" />
            </Form.Item>
            <Form.Item label="Mặt khẩu mới" name="confỉmPassword">
              <Input type="password" />
            </Form.Item>
            <Form.Item label="Xác nhận mật khẩu" name="confỉmPassword">
              <Input type="password" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
}

export default Account;
