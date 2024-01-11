import menu from "./Dropdown";
import './style/sidebar.scss'

const Sidebar = () => {

    return ( 
        <div className="container">
            <div className="cover">
                <h2>History</h2>
                <ul className="sidebar">
                    <li className="title">Today</li>
                    <div className="bar">
                        <li className="item"><a href="">History 1</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>
                    

                    <div className="bar">
                        <li className="item"><a href="">History 2</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>
                    
                    <div className="bar">
                        <li className="item"><a href="">History 3</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>
                    
                    <li className="title">Previous 2 days</li>
                    <div className="bar">
                        <li className="item"><a href="">History 1</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>

                    <div className="bar">
                        <li className="item"><a href="">History 2</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>
                    
                    <div className="bar">
                        <li className="item"><a href="">History 3</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>

                    <li className="title">Previous 7 days</li>
                    <div className="bar">
                        <li className="item"><a href="">History 1</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>

                    <div className="bar">
                        <li className="item"><a href="">History 2</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>
                    
                    <div className="bar">
                        <li className="item"><a href="">History 3</a></li>
                        <div className="setting">
                            <i className="fas fa-ellipsis-h" />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
     );
}



export default Sidebar;
