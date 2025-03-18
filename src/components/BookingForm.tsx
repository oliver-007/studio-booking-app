import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch, useAppSelector } from "../RTK/store";
import { useEffect, useState } from "react";
import { setMessage } from "../RTK/slices/responseMessageSlice";
import { closeModal } from "../RTK/slices/modalSlice";
import Select, { SingleValue } from "react-select";
import { IBookingList } from "../types";

const bookingSchema = z.object({
  username: z.string().min(1, {
    message: "* user name is required",
  }),
  email: z.string().email("* Invalid email").toLowerCase(),
  date: z.date({
    required_error: "* Date is required",
  }),
  time: z.string().min(1, "Time slot is required"),
});

type BookingFormType = z.infer<typeof bookingSchema>;

interface ITimeOption {
  value: string;
  label: string;
}

const BookingForm = () => {
  const { studio } = useAppSelector((state) => state.modal);

  const [bookingError, setBookingError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<BookingFormType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: undefined,
    },
  });

  //  generate a 2-hour timeline
  function generateTimeSlots(open: string, close: string, interval = 2) {
    let slots = [];
    let [openHour, openMinute] = open.split(":").map(Number);
    let [closeHour, closeMinute] = close.split(":").map(Number);

    let currentTime = new Date();
    currentTime.setHours(openHour, openMinute, 0, 0);

    let closingTime = new Date();
    closingTime.setHours(closeHour, closeMinute, 0, 0);

    while (currentTime <= closingTime) {
      let hours = currentTime.getHours().toString().padStart(2, "0");
      let minutes = currentTime.getMinutes().toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);

      // Move 2 hours forward
      currentTime.setHours(currentTime.getHours() + interval);
    }

    return slots;
  }
  let timeSlotOptions: string[] = [];
  if (studio && studio.Availability) {
    timeSlotOptions = generateTimeSlots(
      studio?.Availability.Open,
      studio?.Availability.Close
    );
  }

  // react-select options
  const options: ITimeOption[] =
    timeSlotOptions.length > 0
      ? timeSlotOptions.map((item) => ({ value: item, label: item }))
      : [];

  //  submit form data
  const onSubmit = async (data: BookingFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const storedData = localStorage.getItem("bookingList");

    let existingBookings: IBookingList[] = storedData
      ? JSON.parse(storedData)
      : [];
    // check date & time available
    const isDateTimeAlreadyBooked = existingBookings.some(
      (singleBooking) =>
        singleBooking.studioInfo.Id === studio?.Id &&
        singleBooking.date === data.date.toISOString().split("T")[0] &&
        singleBooking.time === data.time
    );

    if (isDateTimeAlreadyBooked) {
      setBookingError(
        "The selected time slot is not available. Please choose another time 😊"
      );
      return;
    } else setBookingError(null);

    if (!Array.isArray(existingBookings)) {
      existingBookings = [];
    }

    const formDataWithStudioInfo = {
      //  instead of using spread operator (...data), use this approach only formatting date.
      date: data.date.toISOString().split("T")[0],
      email: data.email,
      time: data.time,
      username: data.username,
      studioInfo: { ...studio },
    };
    // @ts-ignore
    existingBookings.push(formDataWithStudioInfo);

    //  store data in local storage
    localStorage.setItem("bookingList", JSON.stringify(existingBookings));
  };

  useEffect(() => {
    const submitionTimer = setTimeout(() => {
      !bookingError &&
        isSubmitted &&
        (dispatch(setMessage(`Studio ${studio?.Name}  Booked Successfully`)),
        dispatch(closeModal()));
    }, 2000);

    return () => clearTimeout(submitionTimer);
  }, [isSubmitted, bookingError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (formErrors) =>
        console.log("validation error: ", formErrors)
      )}
      className="flex flex-col gap-y-4 w-full items-center"
    >
      {/* studio info */}
      <div>
        <p> {studio?.Name} </p>
      </div>

      <div>
        <p> user name: </p>
        <input
          type="text"
          className="modal__input"
          {...register("username")}
          placeholder=" user name..."
        />
        {errors.username && (
          <p className="error__message"> {errors.username.message} </p>
        )}
      </div>
      <div>
        <p>email:</p>
        <input
          type="email"
          className="modal__input"
          {...register("email")}
          placeholder="email..."
        />
        {errors.email && (
          <p className="error__message"> {errors.email.message} </p>
        )}
      </div>
      <div>
        <p>Select date: </p>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
                setValue("date", date!);
              }}
              // showTimeSelect
              dateFormat="dd/MM/yyyy"
              className="modal__input"
              minDate={new Date()} // disable past dates
              placeholderText="select a date"
            />
          )}
        />

        {errors.date && (
          <p className="error__message"> {errors.date.message} </p>
        )}
      </div>

      <div className="w-1/2 ">
        Select Time:
        <Controller
          name="time"
          control={control}
          render={({ field }) => {
            return (
              <Select
                {...field}
                options={options}
                isClearable
                placeholder="Select a time"
                onChange={(selectedOption: SingleValue<ITimeOption>) => {
                  field.onChange(selectedOption ? selectedOption.value : "");
                }}
                value={options.find((option) => option.value === field.value)}
              />
            );
          }}
        />
        {errors.time && (
          <p className="error__message"> {errors.time.message} </p>
        )}
      </div>

      <button type="submit" className="book__now w-1/2 ">
        {isSubmitting ? "Submitting form.." : "Book Now"}
      </button>

      {bookingError && <p className="error__message"> {bookingError} </p>}
    </form>
  );
};

export default BookingForm;
