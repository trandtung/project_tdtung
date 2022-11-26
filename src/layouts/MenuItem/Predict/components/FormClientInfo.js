import { Form, Input, Radio, InputNumber } from "antd";
const { TextArea } = Input;
function FormClientInfo() {
  return (
    <>
      <Form.Item
        label="Họ tên"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Tuổi" name="InputNumber">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Giới tính" name="gioitinh">
        <Radio.Group>
          <Radio value="apple"> Nam </Radio>
          <Radio value="pear"> Nữ </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Dịa chỉ"
        name="address"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
}

export default FormClientInfo;
