import { Button, Modal } from "antd";

function LogoutModal({ isModalOpen, handleCancel, handleOk }) {
  return (
    <>
      <Modal
        title="Bạn có chắc muốn đẵng xuất khỏi tài khoản này?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p></p>
      </Modal>
    </>
  );
}

export default LogoutModal;
