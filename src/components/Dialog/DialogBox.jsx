import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { Megaphone } from "lucide-react";
const DialogBox = ({ uid }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!uid) return;
    setOpen(true);
  }, [uid]);
  const handleClose = useCallback(() => {
    if (!uid) return;
    setOpen(false);
    sessionStorage.setItem(`dialogShown_${uid}`, "true"); // Resets after logout or browser close
  }, [uid]);

  return (
    <Dialog open={open} className="bg-blue-50 max-w-md not-blur rounded-lg">
      <DialogHeader>
        <Typography variant="h5" color="blue-gray" className="mx-auto">
          Your Attention is Required!
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4">
        <Megaphone size={50}/>
        <Typography color="red" variant="h4">
          You should read this!
        </Typography>
        <Typography className="text-center font-normal">
          My Wealth provides general information for educational purposes and
          does not offer financial advice or professional consulting.
        </Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button
          variant="gradient"
          color="red"
          onClick={handleClose}
          disabled={!uid}
          className="mx-auto bg-blue-500 border-0 text-xl"
        >
          Got it
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DialogBox;
