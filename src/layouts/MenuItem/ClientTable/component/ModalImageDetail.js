import { Button, Modal, Card, Image } from "antd";
import { Children, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseApiPredict } from "../../../../request/apiPredict";
import { getListImage } from "../../../../stores/slice/predictImgSlice";
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
    listImage:state?.predictImgSlice?.listImage
  }));

  useEffect(() => {
    dispatch(getListImage(idClient?.dataImage));
  }, [idClient]);

  
  // console.log(listImage)
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
          {listImage && listImage?.map((itemImg, index) => (
            <Card key={index}>
              <Image
                src={`${baseApiPredict}${itemImg.originImg}`}
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
