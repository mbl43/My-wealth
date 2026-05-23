import { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { X, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

const auth = getAuth();

const Modal = ({ investmentCount, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleOpen = () => {
    setOpen(!open);
    if (open) {
      setSubmitStatus({ loading: false, success: false, error: null });
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (submitStatus.loading) return;

    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Convert numeric fields
      const investmentData = {
        ...data,
        mutual_fund: Number(data.mutual_fund || 0),
        fd_value: Number(data.fd_value || 0),
        ppf_value: Number(data.ppf_value || 0),
        stocks_value: Number(data.stocks_value || 0),
        timestamp: new Date(),
      };

      console.log("Submitting investment data:", investmentData);

      const userInvestmentsRef = collection(
        db,
        "investments",
        user.uid,
        "details"
      );
      await addDoc(userInvestmentsRef, investmentData);

      console.log("Investment details added successfully!");
      setSubmitStatus({ loading: false, success: true, error: null });

      if (typeof onSuccess === "function") {
        onSuccess();
      }

      reset();

      setTimeout(() => {
        handleOpen();
      }, 2000);
    } catch (error) {
      console.error("Error adding investment details:", error);
      setSubmitStatus({
        loading: false,
        success: false,
        error: error.message || "Failed to submit. Please try again.",
      });
    }
  };

  const investmentFields = [
    { key: "mutual_fund", label: "Mutual Funds" },
    { key: "fd_value", label: "Fixed Deposits" },
    { key: "ppf_value", label: "PPF" },
    { key: "stocks_value", label: "Stocks" },
    { key: "Gold", label: "Gold" },
    { key: "Silver", label: "Silver" },
  ];

  return (
    <>
      <button
        onClick={handleOpen}
        className="btn-primary text-sm !py-2 !px-4"
      >
        <Plus size={16} />
        Add Investment
      </button>

      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-0 mx-auto bg-surface-900 border border-surface-700/50 rounded-2xl shadow-premium"
      >
        <DialogHeader className="relative m-0 block p-6 pb-0">
          <Typography
            variant="h4"
            className="text-white text-xl font-semibold"
          >
            Add Investment Details
          </Typography>
          <Typography className="mt-1 font-normal text-sm text-surface-400">
            Keep your records up-to-date and organized.
          </Typography>
          <button
            className="absolute right-4 top-4 p-2 rounded-lg text-surface-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={handleOpen}
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <DialogBody className="p-6 pt-4">
          {submitStatus.success ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-400 font-medium">
                Investment added successfully!
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {submitStatus.error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                  {submitStatus.error}
                </div>
              )}

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">
                  Date of Investment
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="input-field"
                />
                {errors.date && (
                  <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>

              {/* Investment Fields */}
              <div className="grid grid-cols-2 gap-3">
                {investmentFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-surface-300 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      placeholder="₹ 0"
                      {...register(field.key, {
                        required: "Value is required",
                        min: { value: 0, message: "Cannot be negative" },
                      })}
                      className="input-field"
                    />
                    {errors[field.key] && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors[field.key].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="btn-primary w-full"
                >
                  {submitStatus.loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Save Investment"
                  )}
                </button>
              </div>
            </form>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Modal;
