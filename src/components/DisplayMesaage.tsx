import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../RTK/store";
import { setMessage } from "../RTK/slices/responseMessageSlice";

const DisplayMesaage = () => {
  const { message } = useAppSelector((state) => state.responseMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const responseMessageTimer = setTimeout(() => {
      dispatch(setMessage(""));
    }, 5000);

    return () => clearTimeout(responseMessageTimer);
  }, []);

  return (
    <div className="absolute left-5 bottom-5 w-fit h-[50px] bg-lime-500 flex items-center justify-center px-4 py-2 rounded-full">
      {message}
    </div>
  );
};

export default DisplayMesaage;
