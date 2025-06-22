"use client";

import { useEffect } from "react";
import { Alert } from "antd";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error on the server:", error);
  }, [error]);

  return (
    <div style={{ padding: 40 }}>
      <Alert
        message="Download error"
        description={error.message}
        type="error"
        showIcon
      />
      <button onClick={() => reset()} style={{ marginTop: 20 }}>
        Try again
      </button>
    </div>
  );
}
