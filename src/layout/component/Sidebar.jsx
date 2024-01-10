
// import styled from "styled-components";
// const StyledComponent = styled.div`
//     color: red;
// `


const Sidebar = () => {
    return ( 
        <>
          <div className="cover">
                <h2>History</h2>
                <ul className="sidebar">
                    <li className="title">Today</li>
                    <li><a href="">History 1</a></li>
                    <li><a href="">History 2</a></li>
                    <li><a href="">History 3</a></li>

                    <li className="title">Previous 2 days</li>
                    <li><a href="">History 1</a></li>
                    <li><a href="">History 2</a></li>
                    <li><a href="">History 3</a></li>

                    <li className="title">Previous 7 days</li>
                    <li><a href="">History 1</a></li>
                    <li><a href="">History 2</a></li>
                    <li><a href="">History 3</a></li>
                </ul>
        </div>
        </>


     );
}
 
export default Sidebar;

