"use client";

import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  query: string;
}

export default function Pagination({ currentPage, query }: Props) {
  const router = useRouter();

  const goToPage = (page: number) => {
    const q = query ? ` &q=${encodeURIComponent(query)}` : "";
    router.push(`/?page=${page}${q}`);
  };

  const totalPages = 500;
  const createPaginationRange = () => {
    const totalButtons = 10;
    const pages = [];
    const start = Math.max(1, currentPage - 4);
    const end = Math.min(totalPages, start + totalButtons - 1);
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };
  const pages = createPaginationRange();

  return (
    <div className="pagination">
      <button
        onClick={() => goToPage(currentPage - 1)}
        className={`nextPrev-btn ${currentPage === 1 ? "disabled" : ""}`}
      >
        Back
      </button>
      {pages.map((p, index) =>
        typeof p === "number" ? (
          <button
            key={index}
            onClick={() => goToPage(p)}
            className={`pagination-num ${currentPage === p ? "active" : ""}`}
          >
            {p}
          </button>
        ) : (
          <span key={index} style={{ padding: "4px 8px" }}>
            ...
          </span>
        )
      )}

      <button
        className={`nextPrev-btn ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
