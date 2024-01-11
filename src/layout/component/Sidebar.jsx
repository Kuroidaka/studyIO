import styled from "styled-components";


const Sidebar = () => {

    const conversationList = [
        {
            name: "History 1",
            lastMessageTime: "Thu Jan 11 2024 10:28:12 GMT+0700 (Indochina Time)",
        },
        {
            name: "History 2",
            lastMessageTime: "Thu Jan 11 2024 10:28:12 GMT+0700 (Indochina Time)",
        },
        {
            name: "History 3",
            lastMessageTime: "Thu Jan 11 2024 10:28:12 GMT+0700 (Indochina Time)",
        },
        {
            name: "History 4",
            lastMessageTime: "Thu Jan 11 2024 10:28:12 GMT+0700 (Indochina Time)",
        },
        {
            name: "History 5",
            lastMessageTime: "Thu Jan 11 2024 10:28:12 GMT+0700 (Indochina Time)",
        },
        {
            name: "History 6",
            lastMessageTime: "Thu Jan 11 2024 10:28:12 GMT+0700 (Indochina Time)",
        },
    ]
    return ( 
        <Container>
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
        </Container>


     );
}
 
export default Sidebar;

const Container = styled.div`
    height: 100%;
    .cover{
        color: var(--white-text);
        background-color: var(--primary-color);
        height: 100%;
        width: 350px;
        line-height: 2;
        padding: 10px 40px;

        h2{
            color: #ffff;
            font-weight: 600;
            font-size: 40px;
        }
        
        .sidebar {
            
            .title{
                color: var(--second-color);
                font-size: 25px;
            }
            li{
                list-style: none;
            }
        }

    }
`