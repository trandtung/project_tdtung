import {
  Form,
  Button,
  Upload,
  Modal,
  Image,
  Card,
  Checkbox,
  Table,
  Space,
  Tag,
} from "antd";
import ModalImageDetail from "./component/ModalImageDetail";
import {
  getClients,
  getClientDetail,
  deleteClient,
} from "../../../stores/slice/tableClientSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import moment from "moment/moment";
import ModalUpdateClient from "./component/ModalUpdateClient";

function ClientTable() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { listClient, loading, clientDetail } = useSelector((state) => ({
    listClient: state.tableClientSlice?.listClient,
    loading: state.tableClientSlice.isLoading,
    clientDetail: state.tableClientSlice?.clientDetail,
  }));

  useEffect(() => {
    dispatch(getClients());
  }, []);

  const viewImageClient = async (data) => {
    await dispatch(getClientDetail(data.key));
    navigate(`/clients/${data.key}`);
  };

  const updateClient = async (data) => {
    const res = await dispatch(getClientDetail(data.key));
    if (getClientDetail.fulfilled.match(res)) {
      // alert("sc")
      setIsModalUpdateClient(true);
      navigate(`/clients/${data.key}`);
    }
  };

  const [idClient, setIdClient] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateClient, setIsModalUpdateClient] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentIdClient, setCurrentIdClient] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    navigate(`/clients`);
    setIsModalOpen(false);
    setConfirmDelete(false);
    setIsModalUpdateClient(false);
  };

  const handleDeleteClient = async () => {
    const response = await dispatch(deleteClient(currentIdClient));
    if (deleteClient.fulfilled.match(response)) {
      setConfirmDelete(false);
      dispatch(getClients());
    }
  };
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Số ảnh",
      dataIndex: "numberImg",
      key: "numberImg",
    },
    {
      title: "Ngày chẩn đoán",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ảnh",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              viewImageClient(record);
              setIsModalOpen(true);
              setIdClient(record);
            }}
          >
            Chi tiết ảnh
          </Button>
        </>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              updateClient(record);
              setIdClient(record);
              // setIdClient(record);
            }}
          >
            Sửa
          </Button>
          <Button
            danger
            onClick={() => {
              console.log(record);
              setCurrentIdClient(record.key);
              setConfirmDelete(true);
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data = useCallback(
    listClient.map((item) => {
      return {
        key: item._id,
        name: item.name,
        age: item.age,
        address: item.address,
        gender: item.gender,
        numberImg: item.dataImage.length,
        createdAt: moment(item.createdAt).format("L LT"),
        dataImage: item.dataImage,
      };
    }),
    [listClient]
  );

  return (
    <>
      <Card>
        <Table columns={columns} dataSource={data} loading={loading} bordered />
      </Card>

      {/* modal Image datail */}
      <ModalImageDetail
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={1200}
        idClient={idClient}
      />

      <ModalUpdateClient
        isModalOpen={isModalUpdateClient}
        // handleOk={handleOk}
        handleCancel={handleCancel}
        // idClient={idClient}
      />

      {/* modal delete client */}
      <Modal
        title="Bạn có chắc muốn xóa người này không?"
        open={confirmDelete}
        okType={"danger"}
        onOk={handleDeleteClient}
        onCancel={handleCancel}
      />
    </>
  );
}

export default ClientTable;
