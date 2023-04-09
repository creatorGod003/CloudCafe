import "./App.css";
import CloudCafe from "./Component/CloudCafe";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

function App() {
  return (
    <div className="flex justify-center items-center h-[100vh] area">
      <ul className="circles z-0">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <CloudCafe />
    </div>
  );
}

export default App;
