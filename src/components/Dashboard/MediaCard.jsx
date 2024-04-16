import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// MediaCard nimmt nun props entgegen, um dynamische Daten anzuzeigen
const MediaCard = ({ item, onSales }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.image || "/static/images/cards/placeholder.jpg"} // Fallback für den Fall, dass kein Bild vorhanden ist
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description || "Erhalte eine Verkaufsübersicht."} 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button onClick={() => onSales(item)} size="small">
          Zeige Verkäufe
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
