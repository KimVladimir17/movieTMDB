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
    console.error("Ошибка на сервере:", error);
  }, [error]);

  return (
    <div style={{ padding: 40 }}>
      <Alert
        message="Ошибка загрузки"
        description={error.message}
        type="error"
        showIcon
      />
      <button onClick={() => reset()} style={{ marginTop: 20 }}>
        Повторить попытку
      </button>
    </div>
  );
}
