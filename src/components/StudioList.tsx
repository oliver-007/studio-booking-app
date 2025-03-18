import { useEffect, useState } from "react";
import { StudiosData } from "../data";
import StudioCard from "./StudioCard";
import { useAppDispatch, useAppSelector } from "../RTK/store";
import Modal from "./Modal";
import DisplayMesaage from "./DisplayMesaage";
import {
  setSearchInputQuery,
  setIsAreaSelected,
} from "../RTK/slices/searchInputSlice";

const StudioList = () => {
  const [error] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const { message } = useAppSelector((state) => state.responseMessage);
  const { filteredStudioList, isSearch, isSearchByRadius } = useAppSelector(
    (state) => state.filteredStudioList
  );
  const { isAreaSelected } = useAppSelector((state) => state.searchInputQuery);
  const dispatch = useAppDispatch();

  // ******* get area with city together ***********
  // const mapedStudioList = [
  //   ...new Map(
  //     filteredStudioList.map((studio) => {
  //       const key = `${studio.Location.Area}-${studio.Location.City}`;
  //       return [key, studio];
  //     })
  //   ).values(),
  // ];
  // console.log("maped studio list : ", mapedStudioList);

  //  unique area list for suggesting area
  const areaListUnique = [
    ...new Set(filteredStudioList.map((studio) => studio.Location.Area)),
  ];

  useEffect(() => {
    // setError(true);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  //  auto-complete feature from suggested area text
  const handleSuggArea = (text: string) => {
    dispatch(setSearchInputQuery(text));
    dispatch(setIsAreaSelected(true));
  };

  return (
    <div>
      {isSearch &&
        !isSearchByRadius &&
        areaListUnique.length > 0 &&
        !isAreaSelected && (
          <div className="absolute bg-white shadow-md shadow-gray-400 left-[200px] w-1/2 rounded-md p-5 min-h-fit overflow-auto">
            {areaListUnique.map((area, index) => (
              <button
                type="button"
                onClick={() => handleSuggArea(`${area}`)}
                key={index}
                className=" flex flex-col py-1 px-3 cursor-pointer hover:bg-gray-300 rounded-md"
              >
                {area}
              </button>
            ))}
          </div>
        )}

      <h2 className="text-2xl p-3 font-bold text-center">Studio List :</h2>
      <div className="flex gap-x-4 justify-center items-center ">
        <p className=" flex items-center">
          Filtered Studios :
          <span className="text-xl font-semibold ml-2">
            {filteredStudioList.length}
          </span>
        </p>
        <p className="flex items-center">
          Total Studios :
          <span className="text-xl font-semibold ml-2">
            {StudiosData.length}
          </span>
        </p>
      </div>

      {error ? (
        <div className="text-rose-500 text-xl text-center p-5">
          {" "}
          Data fetching failed !{" "}
        </div>
      ) : loading ? (
        <div className="text-center text-xl tracking-widest font-semibold text-gray-500 ">
          {" "}
          Loading...{" "}
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-4 p-5 relative ">
          {isSearch ? (
            filteredStudioList.length > 0 ? (
              filteredStudioList.map((studio) => (
                <StudioCard key={studio.Id} studio={studio} />
              ))
            ) : (
              <div className="text-center text-gray-500 w-full">
                No studio found.
              </div>
            )
          ) : StudiosData && StudiosData.length > 0 ? (
            StudiosData.map((studio) => (
              <StudioCard key={studio.Id} studio={studio} />
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">
              No studios available.
            </div>
          )}
        </div>
      )}

      {isModalOpen && <Modal />}

      {message && <DisplayMesaage />}
    </div>
  );
};

export default StudioList;
