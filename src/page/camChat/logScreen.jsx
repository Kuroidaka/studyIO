import styled from 'styled-components'
import Typing from '../../component/Typing'

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
        {isStarted ? (
          <button onClick={voiceRecorder.stop}>Stop session</button>
        ) : (
          <button onClick={voiceRecorder.start}>Start session</button>
        )}
        <DebugBtn onClick={() => setDisplayDebug((prev) => !prev)}>
          Debug
        </DebugBtn>
      </BtnSection>

      <AiResponseContainer>
        <div className="ai-text">
          {isWaiting && <Typing who="Bot" text="is thinking..." />}
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
    opacity: ${props => props.disabled ? '0.5' : '1'};
`;

const AiResponseContainer = styled.div `
  height: 100%;
  display: flex;
  align-items: center;
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

`