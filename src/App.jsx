import { Routes, Route } from "react-router-dom";
import { routes } from './routes/route';
import GlobalStyles from './GlobalStyle'
import { Suspense } from 'react';

function App() {

  return (
    <>

      <GlobalStyles />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route, idx) => {
            return (<Route
              key={idx}
              exact={route.exact}
              path={route.path}
              element={route.page}
            ></Route>
            )
          })}
        </Routes>
      </Suspense>
    </>
  )
}

export default App
