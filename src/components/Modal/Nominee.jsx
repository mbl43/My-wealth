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
import { collection, addDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

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

      // Convert numeric fields
      const investmentData = {
        ...data,
        Name_of_Nominee: data.Name_of_Nominee,
        Nominee_Email: data.Nominee_Email,
      };

      console.log("Submitting investment data:", investmentData);

      // Reference: /investments/{userId}/{investmentId}
    //   /investments/aosvvfh2z5b2XOagdH5rRU1Js5E2/Nominee_details
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
      <Button
        onClick={handleOpen}
        variant="filled"
        className=" float-right m-0 p-2 bg-blue-500"
      >
        <CirclePlus />
      </Button>

      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-2 max-w-[550px] text-center"
      >
        <DialogHeader className="relative m-0 block">
          <Typography
            variant="h4"
            color="blue-gray"
            className="capitalize mx-5"
          >
            Add Nominee Details
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
              Nominee details added successfully!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2 max-w-md mx-auto bg-white"
            >
              {submitStatus.error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
                  {submitStatus.error}
                </div>
              )}

              {/* Name Of Nominee */}
              <div>
                <label className="block text-gray-700 text-left">
                  Name Of Nominee
                </label>
                <input
                  type="text"
                  placeholder="Name Of Nominee"
                  {...register("Name_of_Nominee", {
                    required: "Name is required",
                  })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-left">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-left">
                  Email for Alerts (Sent to Nominee)
                </label>
                <input
                  type="email"
                  placeholder="Enter nominee's email"
                  {...register("Nominee_Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>

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

export default Nominee;
