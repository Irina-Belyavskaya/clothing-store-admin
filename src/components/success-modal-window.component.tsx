import { Modal, Box, Typography } from "@mui/material";

// ============ Types =========================
import { SuccessModalWindowProps } from "types/success-window-props.type";

export default function SuccessModalWindow ({text, isOpen, handleClose} : SuccessModalWindowProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#44BC4B',
          border: '2px solid #44BC4B',
          borderRadius: 10,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'white' }}>
          Success!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: 'white' }}>
          {text}
        </Typography>
      </Box>
    </Modal>
  )
}