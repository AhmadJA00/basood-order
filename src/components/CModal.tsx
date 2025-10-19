import { Modal } from "antd";
import type { ModalProps } from "../gloabal.type";
import { CloseOutlined } from "@ant-design/icons";

const CModal: React.FC<ModalProps> = ({
  children,
  open,
  setOpen,
  title,
  width = 500,
}) => {
  return (
    <Modal
      open={open}
      centered
      title={title}
      onCancel={() => setOpen(false)}
      footer={null}
      width={width}
      closeIcon={<CloseOutlined />}
      className="delete-modal"
      styles={{ body: { padding: 0 } }}
    >
      {children}{" "}
    </Modal>
  );
};
export default CModal;
