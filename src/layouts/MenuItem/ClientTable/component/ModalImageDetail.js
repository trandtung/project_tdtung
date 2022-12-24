import { Button, Modal, Card, Image, Col, Row, Form } from "antd";
import { Children, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseApiPredict } from "../../../../request/apiPredict";
import { getListImage } from "../../../../stores/slice/predictImgSlice";
import RespondedImage from "./RespondedImage";
import FormClientInfo from "../../Predict/components/FormClientInfo";

function ModalImageDetail({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  idClient,
  ...props
}) {
  //   const location = useLocation();
  const dispatch = useDispatch();
  // const [listImage, setListImage] = useState();
  const { detailClient, loading, listImage } = useSelector((state) => ({
    detailClient: state?.tableClientSlice?.clientDetail,
    loading: state.tableClientSlice?.isLoading,
    listImage: state?.predictImgSlice?.listImage,
  }));

  useEffect(() => {
    dispatch(getListImage(idClient?.dataImage));
  }, [idClient]);

  // console.log(listImage);
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
