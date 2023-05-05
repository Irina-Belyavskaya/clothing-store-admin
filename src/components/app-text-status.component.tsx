import { Grid, Typography } from "@mui/material";

// ============== Types ==============
import { AppTextStatusProps } from "types/app-text-status-props.type";

export default function AppTextStatus ({text} : AppTextStatusProps) {
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2
      }} 
    >
      <Typography 
        variant="h4" 
        sx={{
          margin: 0,
          padding: 5,
          color: '#0A5F38'
        }}
        gutterBottom
      >
        {text}
      </Typography>
    </Grid>
  )
}