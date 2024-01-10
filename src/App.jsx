import { Routes, Route } from "react-router-dom";
import { routes } from './Routes/route';
import GlobalStyles from './GlobalStyle'
import './App.css'; // Liên kết đến file CSS

function App() {

  return (
    <div className="App">
    <GlobalStyles />
    <Routes>
        {routes.map((route, idx) => {
          return (<Route 
                    key={idx}
                    exact={route.exact}
                    path={route.path}
                    element={route.page}
                  ></Route>
                )})}
      </Routes>
    </div> 
  )
}

export default App
