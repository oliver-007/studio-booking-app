import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import StudioList from "./components/StudioList";
import BookedStudio from "./components/BookedStudio";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<StudioList />} />
          <Route path="/booked-studio" element={<BookedStudio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
