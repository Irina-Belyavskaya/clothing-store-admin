import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Grid container sx={{ display: 'flex', padding: 1 }}>
      <Grid sx={{marginLeft: 'auto', marginRight: 'auto', color:'#0A5F38 ' }}>
        <CircularProgress sx={{color:'#0A5F38', marginLeft: '20px'}} />
        <Typography variant="button" display="block" gutterBottom>Loading...</Typography> 
      </Grid>
    </Grid>
  );
}