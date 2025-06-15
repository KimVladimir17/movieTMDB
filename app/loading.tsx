import { Spin } from "antd";

export default function Loading() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <Spin size="large" />
    </div>
  );
}
