import NavBar from "./components/NavBar/NavBar";
import { NewsContext, NewsProvider } from './Context/NewsProvider'; // Ensure the path is correct
import { News } from "./components/News/News";
import { SavedNews } from "./components/SavedNews/SavedNews";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { ToastProvider } from "./Context/ToastProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <NewsProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<News />} />
              <Route path="/saved" element={<SavedNews />} />
              <Route path="/:type" element={<News />} />{/* Dynamic route */}
            </Routes>
          </NewsProvider>
          <ScrollToTop />
        </ToastProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
