import styled from 'styled-components'

const Load = () => {
  return (
    <Container>
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    </Container>
  )
}

export default Load

const Container = styled.div`
  height: 100%;
  width: 100%;

  .spinner-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
      width: 35px;
      height: 35px;
      display: inline-block;
      border: 4px solid white;
      border-radius: 50%;
      border-top: 4px solid #ff8000;
      animation: spinner 1.5s linear infinite;
    }
    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }
  }
`
