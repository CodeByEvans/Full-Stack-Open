import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckRating } from "../../../types";

const HealthRating = ({ rating }: { rating: HealthCheckRating }) => {
  const getColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <div>
      <FavoriteIcon sx={{ color: getColor(rating) }} />
      <span style={{ marginLeft: 8 }}>{HealthCheckRating[rating]}</span>
    </div>
  );
};
