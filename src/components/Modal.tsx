import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { useAppDispatch } from "../RTK/store";
import { closeModal } from "../RTK/slices/modalSlice";
import BookingForm from "./BookingForm";

const Modal = () => {
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return createPortal(
    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center ">
      <div className="bg-zinc-100  rounded-md p-5 relative w-1/2">
        <button
          onClick={handleModalClose}
          type="button"
          className="absolute top-2 right-2  bg-rose-500 rounded-md cursor-pointer "
        >
          <IoClose size={30} />
        </button>
        <div className="flex items-center justify-center w-full h-[500px] ">
          <BookingForm />
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
