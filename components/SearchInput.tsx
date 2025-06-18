"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "antd";
import debounce from "lodash.debounce";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") || "");

  const debouncedSearch = debounce((query: string) => {
    const encoded = encodeURIComponent(query.trim());
    router.push(encoded ? `?q=${encoded}` : "/");
  }, 500);

  useEffect(() => {
    debouncedSearch(value);
    return () => {
      debouncedSearch.cancel();
    };
  }, [value]);

  return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <Input
        placeholder="Поиск фильмов..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        allowClear
      />
    </div>
  );
}
