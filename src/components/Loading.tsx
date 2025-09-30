import { Flex, Spin } from "antd";

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    isLoading && (
      <Flex
        align="center"
        justify="center"
        gap="middle"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          zIndex: 1000,
        }}
      >
        <Spin size="large" tip="Loading..." spinning={isLoading} />
      </Flex>
    )
  );
}
