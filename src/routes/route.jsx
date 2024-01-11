import { Navigate } from "react-router"

import DefaultLayout from "../layout/index.jsx"
import ChatPage from "../page/chat/chat.jsx"
import paths from "./path"

export const routes = [
    {
        name: "default",
        page:  <Navigate to={paths.chat} />,
        path: "*",
        exact: true,
    },
    {
        name: "chat",
        page: <DefaultLayout><ChatPage /></DefaultLayout>,
        path: paths.chat, 
        exact: true,

    }

    // {
    //     name: "noPage",
    //     page: <NoPage />,
    //     path: paths.noPage,
    //     exact: true,
    // }
]