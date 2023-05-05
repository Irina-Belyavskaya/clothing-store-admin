import { Button, Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";

//============== Types ===================
import { ConfirmWindowProps } from "types/props.type";
import ErrorAlert from "./error-alert.component";

export default function ConfirmDeletionWindow(
  { handleConfirm, isOpen, handleClose, error }: ConfirmWindowProps) {
  return (
    <Grid container sx={{ marginBottom: 4 }}>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Deletion confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete?
          <Grid container sx={{ marginTop: 2 }}>
            <Button sx={{color: '#0A5F38'}} onClick={handleConfirm}>DELETE</Button>
            <Button sx={{color: '#0A5F38'}} onClick={handleClose}>Cancel</Button>
          </Grid>
          { error && <ErrorAlert title="Error" text={error}/> }   
        </DialogContent>
      </Dialog> 
    </Grid>
  )
}