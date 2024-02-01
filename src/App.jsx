import NavigationBar from "./componant/navbar";
import Jumbotron from "./componant/jumbotron";
import SoundSection from "./componant/soundSection.jsx";
import DisplaySection from "./componant/Display-section";
import WebGiViewer from "./componant/webgiviewer.jsx";
import { scrollAnimation } from "./lib/scroll-animation.js";
import { useRef } from "react";
import userEvent from "@testing-library/user-event";
import Loader from "./componant/Loader.jsx";

function App() {
  const webgiViewerRef = useRef();
  const contentRef = useRef();
  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  };
  return (
    <div className="App">
      <Loader />
      <div ref={contentRef} id="content">
        <NavigationBar />
        <Jumbotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
      </div>
      <WebGiViewer contentRef={contentRef} ref={webgiViewerRef} />
    </div>
  );
}

export default App;
