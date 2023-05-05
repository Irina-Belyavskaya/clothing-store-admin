import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// =========== Types =======================
import { CardProductProps } from "./types/card-product-props.type";

export default function CardProduct({ product, handleOpenFormEdit, handleOpenConfirmWindow }: CardProductProps) {

  return (
    <Card sx={{ width: 300, padding: 1 }}>
      <CardMedia
        component="img" 
        sx={{
          height: 300,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        image={product.image}
        title={product.name}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Name: {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Brand: {product.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {product.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary">
          <IconButton
            onClick={() => handleOpenFormEdit(product.id)}
            sx={{ color: 'black', padding: 0 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenConfirmWindow(product.id)}
            sx={{ color: 'black', padding: 0 }}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
      </CardActions>
    </Card>
  );
}
