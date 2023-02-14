import React, { useState } from "react";
import { changeCompetitionStatus } from "../../../Middlewares/systemManager/systemManager";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

export const DeleteCompetition = ({ competitionID, competitionName }) => {
  const { user } = useAuth0();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event.target.innerText === "DELETE IT") {
      changeCompetitionStatus("Deleted", competitionID, user.sub);
      window.location.href = "/";
    }
    setOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-danger"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Delete
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are youe sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You are about to delete "{competitionName}" competition, Are you
            sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nooooo!</Button>
          <Button onClick={handleClose}>DELETE IT</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
