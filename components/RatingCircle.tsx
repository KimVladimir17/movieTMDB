type Props = {
  rating?: number;
};

function getRatingColor(rating: number): string {
  if (rating < 3) return "#E90000";
  if (rating < 5) return "#E97E00";
  if (rating < 7) return "#E9D100";
  return "#66E900";
}

export default function RatingCircle({ rating }: Props) {
  if (rating == null) return null;
  const color = getRatingColor(rating);

  return (
    <div
      className="rating-circle"
      style={{
        border: `3px solid ${color}`,
      }}
    >
      {rating.toFixed(1)}
    </div>
  );
}
