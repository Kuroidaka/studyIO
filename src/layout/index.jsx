
import { Suspense, useContext, useState } from "react";
import styled from "styled-components";
import { ChevronRight, ChevronLeft } from 'react-feather';

import Sidebar from "./component/sidebar/Sidebar";
import ConversationContext from '../context/Conversation.Context';
import { ConversationProvider } from "../context/Conversation.Context";
import { FileProvider } from "../context/File.Context";
import Load from "../component/Load";


const DefaultLayout = ( p ) => {
    const { children } = p

    return (
        <FileProvider>
            <ConversationProvider>
                <DefaultLayoutComponent>{children}</DefaultLayoutComponent>
            </ConversationProvider>
        </FileProvider>
    )
}

const DefaultLayoutComponent = (p) => {
    const { children } = p

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isChevronRight, setIsChevronRight] = useState(false);

    const handleChevronClick = () => {
        setIsChevronRight(prevState => !prevState);
        setSidebarOpen(prevState => !prevState)
    };
    
    // conversation
    const { conList, isLoading, selectedCon, selectCon } = useContext(ConversationContext);

    const sidebarProps = {
        isLoading,
        conList,
        selectedCon,
        selectCon
    }

    return (
       <Container>
        
        <div className="body">
            {sidebarOpen && <Sidebar {...sidebarProps}/>}
            <Suspense fallback={<LoadingContainer><Load minSize="35px"/></LoadingContainer>}>
                <div className="page-content">
                    <div className="icon-wrapper" onClick={handleChevronClick}>
                        {isChevronRight
                        ? <ChevronRight className='chevron-icon'/>
                        : <ChevronLeft className='chevron-icon'/>
                        }
                    </div>
                    {children}
                </div>
            </Suspense>
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

            .icon-wrapper {
                
                position: absolute;
                width: 31px;
                height: 40px;
                top: 50%;
                z-index: 999;
                .chevron-icon {
                    transition: transform 0.3s ease, color 0.3s ease; /* Thêm hiệu ứng chuyển động và màu sắc */
                    color: #ffffff; /* Màu trắng ban đầu */
                    width: 100%;
                    height: 100%;
                }
                &:hover{
                    
                    .chevron-icon {
                        transform: scale(1.2); /* Kích thước tăng lên khi hover */
                        color: #f0f0f0; /* Màu trắng đậm hơn khi hover */
                    }
                }
            }
            
        }

    }
    

`

const LoadingContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`