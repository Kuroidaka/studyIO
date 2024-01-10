
import Sidebar from "./Component/Sidebar";
import { Fragment } from "react";

const DefaultLayout = ( p ) => {
    const { children } = p

    return (
        <DefaultLayoutComponent>{children}</DefaultLayoutComponent>
    )
}

const DefaultLayoutComponent = (p) => {
    const { children } = p

    return (
       <Fragment>
            <div className="body">
                <Sidebar />
                <div className="page-content">
                    {children}
                </div>
            </div>
       </Fragment>
    )
}
 
export default DefaultLayout;