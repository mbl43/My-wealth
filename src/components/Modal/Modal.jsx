import { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase/firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

      // Reference: /investments/{userId}/{investmentId}
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

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="filled"
        className="bg-blue-600 capitalize sm:text-sm p-2"
      >
        Add Investment Details
      </Button>

      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-2 max-w-[550px] text-center mx-auto"
      >
        <DialogHeader className="relative m-0 block">
          <Typography
            variant="h4"
            color="blue-gray"
            className="capitalize mx-5"
          >
            Add Investment Details
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
          <X
            className="h-7 w-7 stroke-4 !absolute right-3.5 top-3.5 cursor-pointer"
            onClick={handleOpen}
          />
        </DialogHeader>

        <DialogBody className="pb-3">
          {submitStatus.success ? (
            <div className="text-green-500 font-medium text-center py-4">
              Investment details added successfully!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 max-w-md mx-auto bg-white"
            >
              {submitStatus.error && (
                <div className="mb-2 p-2 bg-red-100 text-red-700 rounded border border-red-300">
                  {submitStatus.error}
                </div>
              )}
              {/* Date of Investment */}
              <div>
                <label className="block text-gray-700 text-left">
                  Date Of Investment
                </label>
                <input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.date && (
                  <p className="text-red-500 text-left">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Investment Fields */}
              {["mutual_fund", "fd_value", "ppf_value", "stocks_value","Gold","Silver"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-gray-700 text-left capitalize">
                      Monthly Investment in {field.replace("_", " ")}
                    </label>
                    <input
                      type="number"
                      placeholder={`Enter amount for ${field.replace(
                        "_",
                        " "
                      )}`}
                      {...register(field, {
                        required: "Value is required",
                        min: { value: 0, message: "Value cannot be negative" },
                      })}
                      className="w-full px-4 py-2 border-2 border-black rounded-lg"
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-left">
                        {errors[field].message}
                      </p>
                    )}
                  </div>
                )
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className={`w-full px-4 py-2 rounded-lg text-white font-medium ${
                    submitStatus.loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {submitStatus.loading ? "Submitting..." : "Submit"}
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
