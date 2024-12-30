import { Modal, Box, Typography } from "@mui/material";

export const muiModal = ({ isOpen, onClose, title, body, isError }) => {
  const errorStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#de4558",
    border: "2px solid #333",
    color: "#FFF",
    boxShadow: 24,
    p: 2,
  };
  const succesStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#de4558",
    border: "2px solid #333",
    color: "#FFF",
    boxShadow: 24,
    p: 2,
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box maxWidth="80%" sx={isError ? succesStyle : errorStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {body}
        </Typography>
      </Box>
    </Modal>
  );
};
