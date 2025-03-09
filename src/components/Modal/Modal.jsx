import { useState } from "react";
import {
  Input,
  Button,
  Dialog,
   Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { X } from "lucide-react";
const Modal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
        className="p-4 max-w-[550px] text-center mx-auto backdrop-blur-none"
     
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray" className="capitalize">
            Add Investment details Monthly
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
        <DialogBody className="space-y-4 pb-6">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Enter Total Monthly Investment
            </Typography>
            <form action="" method="post">
              
            </form>
            <Input
              color="gray"
              size="lg"
              placeholder="Enter Total Monthly Investment"
              name="name"
              type="number"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              required
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto bg-blue-500" onClick={handleOpen}>
            Add Data
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default Modal;
