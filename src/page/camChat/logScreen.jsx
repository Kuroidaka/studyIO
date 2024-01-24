import styled from 'styled-components'

import Typing from '../../component/Typing'
import EmptyBox from '../chat/chatbox/EmptyBox'

const LogScreen = (p) => {
    const {
        voiceRecorder,
        isStarted,
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
        <Typing who="Bot" text="is thinking..." /> 
      }
      {botText.length === 0 && !isWaiting && isStarted && <EmptyBox />}
        <p>{botText}</p> 
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
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  justify-content: center;

  .ai-text {
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    overflow: scroll;
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