import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    isLoading && (
      <Flex align="center" justify="center" gap="middle">
        <Spin
          size="large"
          tip="Loading..."
          fullscreen
          spinning={isLoading}
          // indicator={<LoadingOutlined spin />}
        />
      </Flex>
    )
  );
}
