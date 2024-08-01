import styled from 'styled-components'

import Typing from '../../component/Typing'
import EmptyBox from '../chat/chatbox/EmptyBox'
import MarkDown from '../../component/MarkDownChat';

const LogScreen = (p) => {
    const {
        isWaiting,
        botText,
        setDisplayDebug,
    } = p
  

  return (
    <LogScreenContainer>
      <BtnSection>
        <DebugBtn onClick={() => setDisplayDebug((prev) => !prev)}>
          Show Log
        </DebugBtn>
      </BtnSection>

      <AiResponseContainer>
      <div className="ai-text">
      {isWaiting &&
        <Typing who="Raine" text="is thinking..." /> 
      }
        <AiResponse>
          {botText.length === 0 && !isWaiting && <EmptyBox />}
          <MarkDown text={botText}/>
        </AiResponse>
      </div>

      </AiResponseContainer>
    </LogScreenContainer>
  )
}

export default LogScreen

const LogScreenContainer = styled.div`
  height: 100%;
  flex: 1
    
`


const DebugBtn = styled.button`
padding: 0.5rem 1rem;
  background-color: #4A5568;
  border-radius: 0.375rem;
  opacity: 1;
  border: none;
  color: white;
  height: 45px;
  cursor: pointer;
  opacity: ${props => props.disabled ? '0.5' : '1'};
`;

const AiResponseContainer = styled.div `
  height: 92%;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  overflow: scroll;
  border-radius: 12px;


  .ai-text {
    color: white;
    height: 100%;

    p {
      font-weight: 600;
      padding: 10px;
      font-size: 1.2rem;
    }
  }
`

const BtnSection = styled.div `
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 8%;
`

const AiResponse = styled.div `
  width: 100%;
  background: #5a5959;
  padding: 10px;
  border-radius: 12px;

`