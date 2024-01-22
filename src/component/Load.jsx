import styled, { css } from 'styled-components'

const Load = (p) => {
  const { minSize="15px" } = p
  return (
    <Container minSize={minSize}>
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
      ${props => props.minSize && css`
        min-width: ${props.minSize};
        min-height: ${props.minSize};
      `}
    }
    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }
  }
`
