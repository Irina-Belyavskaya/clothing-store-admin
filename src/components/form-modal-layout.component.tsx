import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid } from "@mui/material";

import { ModalFormLayoutProps } from "../types/props.type";

export default function ModalFormLayout(
  { children, formTitle, buttonTitle, handleSubmit, isOpen, handleClose }: ModalFormLayoutProps) {

  return (
    <Grid container sx={{ marginBottom: 4 }}>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            {children}
            <Grid container sx={{ marginTop: 2 }}>
              <Button sx={{color: '#0A5F38'}} type="submit">{buttonTitle}</Button>
              <Button sx={{color: '#0A5F38'}} onClick={handleClose}>Cancel</Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
