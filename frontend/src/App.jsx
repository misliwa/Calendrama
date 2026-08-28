import {Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home.jsx";
import Employees from "./pages/Employees.jsx";
import Plays from "./pages/Plays.jsx";
import Settings from "./pages/Settings.jsx";
import Stages from "./pages/Stages.jsx";
import AppLayout from "./pages/AppLayout.jsx";

function App() {
  return (
      <>
          <Routes>
              <Route element={<AppLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/plays" element={<Plays />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/stages" element={<Stages />} />
              </Route>
          </Routes>
      </>
  )
}

export default App
