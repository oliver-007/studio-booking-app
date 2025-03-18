import BookingListTable from "./BookingListTable";

const BookedStudio = () => {
  const bookingList = localStorage.getItem("bookingList");
  const parsedBookingList = bookingList ? JSON.parse(bookingList) : [];

  return (
    <div className="">
      <h3 className="text-center text-xl text-gray-500 font-semibold py-4">
        Booking List :
      </h3>

      {parsedBookingList.length > 0 ? (
        <div className=" ">
          <BookingListTable parsedBookingList={parsedBookingList} />
        </div>
      ) : (
        <div className="text-2xl text-center text-zinc-700 p-5 ">
          {" "}
          No Booking Found !{" "}
        </div>
      )}
    </div>
  );
};

export default BookedStudio;
