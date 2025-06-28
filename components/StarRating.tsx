import { StarFilled, StarOutlined } from "@ant-design/icons";

export function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate: (value: number) => void;
}) {
  return (
    <div style={{ fontSize: 20 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
        i <= rating ? (
          <StarFilled
            key={i}
            onClick={() => onRate(i)}
            style={{ color: "#fadb14", cursor: "pointer" }}
          />
        ) : (
          <StarOutlined
            key={i}
            onClick={() => onRate(i)}
            style={{ color: "#ccc", cursor: "pointer" }}
          />
        )
      )}
    </div>
  );
}
