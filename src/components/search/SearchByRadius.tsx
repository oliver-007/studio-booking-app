import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { getDistanceFromLatLonInKm } from "../../utils/getDistance";

import { StudiosData } from "../../data";
import {
  resetFilteredStudioList,
  setFilteredStudioList,
  setIsSearchByRadius,
} from "../../RTK/slices/studioSlice";
import { useDispatch } from "react-redux";

interface IRadiusOptions {
  value: number;
  label: string;
}
// radius options
const radiusOptions: IRadiusOptions[] = [
  {
    value: 2.5,
    label: "2.5 km",
  },
  {
    value: 5,
    label: "5 km",
  },
  {
    value: 10,
    label: "10 km",
  },
  {
    value: 20,
    label: "20 km",
  },
];

const SearchByRadius = () => {
  const [errMessage, setErrMessage] = useState("");
  const [selectedRadius, setSelectedRadius] = useState<IRadiusOptions | null>(
    null
  );
  const [userGeoLocation, setUserGeoLocation] = useState<{
    userLat: number;
    userLon: number;
  } | null>(null);
  const dispatch = useDispatch();

  // user geoLocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserGeoLocation({
          userLat: position.coords.latitude,
          userLon: position.coords.longitude,
        });
      },
      (error) => {
        setErrMessage(error.message);
      }
    );
  }, []);

  // filter studio by radius
  useEffect(() => {
    if (selectedRadius) {
      if (userGeoLocation) {
        const nearByStudio = StudiosData.filter((studio) => {
          // studio distance
          const getStudioDistance = getDistanceFromLatLonInKm(
            userGeoLocation.userLat,
            userGeoLocation.userLon,
            studio.Location.Coordinates.Latitude,
            studio.Location.Coordinates.Longitude
          );
          return selectedRadius && getStudioDistance <= selectedRadius.value;
        });

        dispatch(setFilteredStudioList(nearByStudio));
        dispatch(setIsSearchByRadius(true));
      }
    } else {
      dispatch(resetFilteredStudioList());
      dispatch(setIsSearchByRadius(false));
    }
  }, [userGeoLocation, selectedRadius]);

  return (
    <div className="w-[250px] ">
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "green" : "gray",
            borderRadius: "50px",
            padding: "1px 5px",
            cursor: "pointer",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#D97706"
              : state.isFocused
              ? "#6EE7B7"
              : "",
            cursor: "pointer",
          }),
        }}
        options={radiusOptions}
        value={selectedRadius}
        onChange={(option: SingleValue<IRadiusOptions>) => {
          setSelectedRadius(option);
        }}
        placeholder="Search by Radius ..."
        isClearable
      />
      {errMessage && (
        <div className="error__message bg-zinc-100 rounded-full py-1 text-center ">
          {" "}
          {errMessage}{" "}
        </div>
      )}
    </div>
  );
};

export default SearchByRadius;
