import Catalog from "./Pages/Catalog/Catalog";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Navigation from "./Components/Navigation/Navigation";
import classes from "./App.module.scss";
function App() {
  return (
    <div className={classes.appBlock}>
      <Navigation />
      <div className={classes.appPages}>
        <Routes>
          <Route path="/" element={<Catalog />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
