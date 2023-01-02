import { Modal, Card, Image, Col, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseApiPredict } from "../../../../request/apiPredict";
import { getListImage } from "../../../../stores/slice/predictImgSlice";
import RespondedImage from "./RespondedImage";

function ModalImageDetail({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  idClient,
  ...props
}) {
  const dispatch = useDispatch();
  const { detailClient, loading, listImage } = useSelector((state) => ({
    detailClient: state?.tableClientSlice?.clientDetail,
    loading: state.tableClientSlice?.isLoading,
    listImage: state?.predictImgSlice?.listImage,
  }));

  useEffect(() => {
    dispatch(getListImage(idClient?.dataImage));
  }, [idClient]);

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
          {listImage &&
            listImage?.map((itemImg, index) => (
              <Row gutter={[16, 24]} key={index}>
                <Col span={12}>
                  <Card>
                    <Image
                      src={`${baseApiPredict}${itemImg.originImg}`}
                      width={500}
                      height={600}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    {itemImg.previewImg && (
                      <>
                        <Image
                          src={`${baseApiPredict}static/preview${itemImg.previewImg}`}
                          width={500}
                          height={600}
                        />
                        <RespondedImage
                          annotationsToDraw={itemImg.feedBackImg}
                        />
                      </>
                    )}
                  </Card>
                </Col>
              </Row>
            ))}
        </Modal>
      )}
    </>
  );
}

export default ModalImageDetail;
