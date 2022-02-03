import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as React from "react";
export default function FeedBack({
  feedBack,
  open,
  setOpen,
  success,
}: {
  feedBack: string;
  open: boolean;
  setOpen: any;
  success: boolean;
}) {
  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {feedBack}
        </Alert>
      </Snackbar>
    </div>
  );
}
