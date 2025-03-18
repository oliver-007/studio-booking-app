import { IBookingList } from "../types";

const BookingListTable = ({
  parsedBookingList,
}: {
  parsedBookingList: IBookingList[];
}) => {
  return (
    <table className="w-full text-center ">
      <thead className="bg-sky-300 ">
        <tr>
          <th className="py-5"> User Name </th>
          <th> E-mail </th>
          <th> Studio Name </th>
          <th> Type </th>
          <th> Location </th>
          <th> Time & Date </th>
        </tr>
      </thead>

      <tbody>
        {parsedBookingList.length > 0 &&
          parsedBookingList.map((item, index) => {
            return (
              <tr
                key={index}
                className={`border border-gray-100 ${
                  index % 2 !== 0 ? "bg-purple-200" : "bg-cyan-100"
                }  `}
              >
                <td className="py-3 "> {item.username} </td>
                <td> {item.email} </td>
                <td> {item.studioInfo.Name} </td>
                <td> {item.studioInfo.Type} </td>
                <td>
                  {" "}
                  {item.studioInfo.Location.Area},{" "}
                  {item.studioInfo.Location.City}{" "}
                </td>
                <td>
                  {" "}
                  {item.time} - {new Date(item.date).toLocaleDateString()}{" "}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default BookingListTable;
