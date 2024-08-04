import { Routes, Route } from "react-router-dom";
import { routes } from './routes/route';
import GlobalStyles from './GlobalStyle'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>

      <GlobalStyles />
      
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                exact={route.exact}
                path={route.path}
                element={route.page}
              ></Route>
            )
          })}
        </Routes>
    </>
  )
}

export default App

