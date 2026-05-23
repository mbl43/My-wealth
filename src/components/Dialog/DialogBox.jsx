import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { AlertTriangle } from "lucide-react";
import { div } from "framer-motion/client";

const DialogBox = ({ uid }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!uid) return;
    if (Math.floor(Math.random() * 10) === 1) return setOpen(true);
  }, [uid]);
  const handleClose = useCallback(() => {
    if (!uid) return;
    setOpen(false);
    sessionStorage.setItem(`dialogShown_${uid}`, "true");
  }, [uid]);

  return (
    
    <Dialog open={open} className="bg-surface-900 border border-surface-700/50 max-w-md not-blur rounded-2xl shadow-premium">
      <DialogHeader className="pb-0">
        <Typography variant="h5" className="text-white mx-auto text-lg font-semibold">
          Important Notice
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4 border-surface-800/50 py-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
          <AlertTriangle size={28} className="text-amber-400" />
        </div>
        <Typography className="text-center text-sm text-surface-300 leading-relaxed max-w-xs">
          My Wealth provides general information for educational purposes and does not offer financial advice or professional consulting.
        </Typography>
      </DialogBody>
      <DialogFooter className="pt-0 pb-6">
        <button onClick={handleClose} disabled={!uid} className="btn-primary mx-auto">
          Got it
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default DialogBox;
