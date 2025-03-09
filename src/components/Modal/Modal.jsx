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
const Modal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="filled"
        className="bg-blue-500 capitalize text-sm"
      >
        Add Investment details
      </Button>
      {/* Modal */}

      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-2 max-w-[550px] text-center mx-auto"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray" className="capitalize mx-5">
            Add Investment details
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
          <X
            className="h-7 w-7 stroke-4 !absolute right-3.5 top-3.5 cursor-pointer"
            size="xl"
            onClick={handleOpen}
          />
        </DialogHeader>
        {/* form */}
        <DialogBody className=" pb-3">
          <div className="max-w-md  mx-auto bg-white ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 text-left">
                  Name Of Nominee
                </label>
                <input
                  type="text"
                  placeholder="Name Of Nominee"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.name && (
                  <p className="text-red-500 text-left">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 capitalize text-left">
                  Add Email for alerts (Email sent to Nominee)
                </label>
                <input
                  type="email"
                  placeholder="Add Email for alerts (Email sent to Nominee)"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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

              <div>
                <label className="block text-gray-700 text-left">
                  Enter Monthly investment in Mutual fund
                </label>
                <input
                  type="number"
                  placeholder="Monthly investment in Mutual fund"
                  {...register("mutual_fund", { required: "Value required" })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.mutual_fund && (
                  <p className="text-red-500 text-left">
                    {errors.mutual_fund.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-left">
                  Enter Monthly investment in FD
                </label>
                <input
                  type="number"
                  placeholder="Monthly investment in FD"
                  {...register("fd_value", { required: "Value required" })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.fd_value && (
                  <p className="text-red-500 text-left">
                    {errors.fd_value.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-left">
                  Enter Monthly investment in PPF{" "}
                </label>
                <input
                  type="number"
                  placeholder="Monthly investment in PPF"
                  {...register("ppf_value", { required: "Value is required" })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.ppf_value && (
                  <p className="text-red-500 text-left">
                    {errors.ppf_value.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-left">
                  Enter Monthly investment in Stocks
                </label>
                <input
                  type="number"
                  placeholder="Monthly investment in Stocks"
                  {...register("stocks_value", {
                    required: "Value is required",
                  })}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg"
                />
                {errors.stocks_value && (
                  <p className="text-red-500 text-left">
                    {errors.stocks_value.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default Modal;
