import styled, { css } from 'styled-components'

const Load = (p) => {
  const { minsize="15px" } = p
  return (
    <Container minsize={minsize}>
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

      display: inline-block;
      border: 4px solid white;
      border-radius: 50%;
      border-top: 4px solid #3d80ff;
      animation: spinner 1.5s linear infinite;
      ${props => props.minsize && css`
        min-width: ${props.minsize};
        min-height: ${props.minsize};
      `}
    }
    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }
  }
`
