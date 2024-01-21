import { Routes, Route } from "react-router-dom";
import { routes } from './routes/route';
import GlobalStyles from './GlobalStyle'
import { Suspense } from 'react';
import Load from "./component/Load";
import styled from "styled-components";

function App() {
  
  return (
    <>

      <GlobalStyles />
      <Suspense fallback={<LoadingContainer><Load /></LoadingContainer>}>
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


const LoadingContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`