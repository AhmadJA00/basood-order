import { Button, Flex, Modal } from "antd";
import React from "react";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import service from "../service";
import { useNotification } from "../context/NotificationContext";
import { useTranslation } from "react-i18next";
import { DeleteConditions } from "../type";
import helpers from "../helpers";
type T = {
  row: any;
  collectionName: string;
  isDelete: boolean;
  isEdit: boolean;
  isShow: boolean;
  fetchData: () => void;
  deleteConditions?: DeleteConditions;
};

export const DeleteButton: React.FC<{
  row: any;
  collectionName: string;
  fetchData: () => void;
  label?: string;
  deleteConditions?: DeleteConditions;
}> = ({ row, collectionName, fetchData, label, deleteConditions }) => {
  const { openNotification } = useNotification();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const deleteHandler = async () => {
    setLoading(true);
    try {
      if (deleteConditions && deleteConditions?.length > 0) {
        const result = await helpers.preventDeleteRecord(deleteConditions);
        if (result.prevent) {
          openNotification(
            "error",
            result.message || "Delete condition not met"
          );
          return;
        }
      }
      await service.delete(collectionName, [row.id]);
      openNotification("success", "Deleted successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      openNotification("error", errorMessage);
    } finally {
      setLoading(false);
      setOpen(false);
      fetchData();
    }
  };
  return (
    <>
      <Button type="primary" danger onClick={() => setOpen(true)}>
        <DeleteOutlined />
      </Button>

      <Modal
        open={open}
        centered
        title={null}
        onCancel={() => setOpen(false)}
        footer={null}
        width={500}
        closeIcon={<CloseOutlined />}
        className="delete-modal"
        styles={{ body: { padding: 0 } }}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-center text-lg font-semibold text-gray-900">
            {t("delete.areYouSure")}
          </p>
          <p className="text-center text-sm text-gray-500">
            {t("delete.areYouSureYouWantToDeleteThisItem")}
          </p>

          <div className="flex  gap-2">
            <Button
              type="primary"
              danger
              onClick={deleteHandler}
              loading={loading}
              size="middle"
              className="!px-12"
            >
              {t("delete.delete")}
            </Button>
            <Button
              type="primary"
              onClick={() => setOpen(false)}
              size="middle"
              className="!px-12"
            >
              {t("delete.cancel")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const Actions: React.FC<T> = ({
  row,
  isDelete = false,
  isEdit = false,
  isShow = false,
  collectionName,
  fetchData = () => {},
  deleteConditions,
}) => {
  const navigate = useNavigate();

  return (
    <Flex align="center" gap="small">
      {isEdit && (
        <Button type="primary" onClick={() => navigate(`edit/${row?.id}`)}>
          <EditOutlined />
        </Button>
      )}
      {isShow && (
        <Button type="primary" onClick={() => navigate(`show/${row?.id}`)}>
          <EyeOutlined />
        </Button>
      )}
      {isDelete && (
        <DeleteButton
          row={row}
          deleteConditions={deleteConditions}
          collectionName={collectionName}
          fetchData={fetchData}
        />
      )}
    </Flex>
  );
};

export default Actions;
