import { Button, Flex, Modal } from "antd";
import React from "react";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";
import type { ActionsPropsType } from "../gloabal.type";

export const DeleteButton: React.FC<{
  deleteFunction?: () => void;
}> = ({ deleteFunction }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  if (!deleteFunction) {
    return;
  }

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
              onClick={() => {
                deleteFunction();
                setOpen(false);
              }}
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

const Actions: React.FC<ActionsPropsType> = ({
  id,
  hasEdit = false,
  hasShow = false,
}) => {
  const navigate = useNavigate();

  return (
    <Flex align="center" gap="small">
      {hasEdit && (
        <Button type="primary" onClick={() => navigate(`edit/${id}`)}>
          <EditOutlined />
        </Button>
      )}
      {hasShow && (
        <Button type="primary" onClick={() => navigate(`show/${id}`)}>
          <EyeOutlined />
        </Button>
      )}
    </Flex>
  );
};

export default Actions;
