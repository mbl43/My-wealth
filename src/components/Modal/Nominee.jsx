import { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { CirclePlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const auth = getAuth();

const Nominee = ({ onSuccess }) => {
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

      const investmentData = {
        ...data,
        Name_of_Nominee: data.Name_of_Nominee,
        Nominee_Email: data.Nominee_Email,
        updated_at: serverTimestamp()
      };

      console.log("Submitting investment data:", investmentData);

      const userInvestmentsRef = collection(
        db,
        "investments",
        user.uid,
        "Nominee_details"
      );
      await addDoc(userInvestmentsRef, investmentData);

      toast.success("Nominee details added successfully!");
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

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-1 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-all"
        title="Add/Update Nominee"
      >
        <CirclePlus size={18} />
      </button>

      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-0 w-full mx-auto bg-surface-900 border border-surface-700/50 rounded-2xl shadow-premium"
      >
        <DialogHeader className="relative m-0 block p-6 pb-0">
          <Typography
            variant="h4"
            className="text-white text-xl font-semibold"
          >
            Add Nominee Details
          </Typography>
          <Typography className="mt-1 font-normal text-sm text-surface-400">
            Your nominee will receive investment summaries via email.
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
                Nominee added successfully!
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

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">
                  Nominee Name
                </label>
                <input
                  type="text"
                  placeholder="Full name of nominee"
                  {...register("Name_of_Nominee", {
                    required: "Name is required",
                  })}
                  className="input-field"
                />
                {errors.Name_of_Nominee && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.Name_of_Nominee.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">
                  Nominee Email
                </label>
                <input
                  type="email"
                  placeholder="nominee@email.com"
                  {...register("Nominee_Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="input-field"
                />
                {errors.Nominee_Email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.Nominee_Email.message}
                  </p>
                )}
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
                    "Save Nominee"
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

export default Nominee;
