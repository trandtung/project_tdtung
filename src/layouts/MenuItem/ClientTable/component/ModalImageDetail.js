import { Button, Modal, Card, Image } from "antd";
import { Children } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseApiPredict } from "../../../../request/apiPredict";
function ModalImageDetail({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  ...props
}) {
  //   const location = useLocation();
  const { detailClient, loading } = useSelector((state) => ({
    detailClient: state.tableClientSlice.clientDetail,
    loading: state.tableClientSlice?.isLoading,
  }));
  console.log(detailClient);
  return (
    <>
      {detailClient?.dataImage && (
        <Modal
          title="Chi tiết ảnh:"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          {...props}
        >
          {detailClient?.dataImage.map((itemImg, index) => (
            <Card key={index}>
              <Image
                src={`${baseApiPredict}${itemImg.img}`}
                width={500}
                height={600}
              />
            </Card>
          ))}
        </Modal>
      )}
    </>
  );
}

export default ModalImageDetail;
