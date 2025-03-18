import { setModal } from "../RTK/slices/modalSlice";
import { useAppDispatch } from "../RTK/store";
import { IStudio } from "../types";

const StudioCard = ({ studio }: { studio: IStudio }) => {
  const { Name, Type, Location, Amenities, PricePerHour, Rating } = studio;
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(setModal(studio));
  };

  return (
    <div className=" rounded-md w-[400px] h-[600px] shadow-md shadow-gray-400 flex flex-col justify-around px-10 ">
      <div>
        <p> Name: {Name} </p>
        <div>
          <span className="font-semibold">Location:</span>
          <div className="ml-3">
            <p>City: {Location.City} </p>
            <p> Area: {Location.Area} </p>
            <p> Address: {Location.Address} </p>
          </div>
          <div className="">
            <span className="font-semibold">Coordinates:</span>
            <p className="ml-3"> Latitude: {Location.Coordinates.Latitude} </p>
            <p className="ml-3">
              {" "}
              Longitude: {Location.Coordinates.Longitude}{" "}
            </p>
          </div>
        </div>
        <div>
          <span className="font-semibold">Aminities: </span>
          {Amenities.length > 0 && Amenities.join(", ")}
        </div>
        <p> Type: {Type} </p>
        <p> Price per hour: {PricePerHour} .tk </p>
        <p>Rating: {Rating} </p>
      </div>
      <button onClick={handleOpenModal} type="button" className="book__now">
        {" "}
        booking now
      </button>
    </div>
  );
};

export default StudioCard;
