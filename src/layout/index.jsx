
import styled from "styled-components";
import Sidebar from "./component/Sidebar";
import { ChevronRight } from 'react-feather';

const DefaultLayout = ( p ) => {
    const { children } = p

    return (
        <DefaultLayoutComponent>{children}</DefaultLayoutComponent>
    )
}

const DefaultLayoutComponent = (p) => {
    const { children } = p

    return (
       <Container>
            <div className="body">
                <Sidebar />
                <div className="page-content">
                    <ChevronRight className='chevron-icon'/>
                    {children}
                </div>
            </div>
       </Container>
    )
}
 
export default DefaultLayout;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    .body {
        display: flex;
        width: 100%;
        height: 100%;
    
        .page-content {
            flex: 1;
            position: relative;
            .chevron-icon {
                position: absolute;
                width: 40px;
                height: 40px;
                top: 50%;
                z-index: 999;
            }
            
        }

    }

    
`