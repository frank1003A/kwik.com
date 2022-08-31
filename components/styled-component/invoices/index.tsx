import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  //gap: 2rem;
  background: var(--bg);
  align-items: flex-start;
  flex-direction: column;

  #chipFont {
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #fff;
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }
`;
export const Top = styled.section`
  right: 0;
  left: 250px;
  display: flex;
  padding: 0.5rem 3rem;
  background: var(--bg);
  border-bottom: 1px solid #2221;
  align-items: center;
  position: fixed;
  z-index: 100;
  justify-content: space-between;

  div {
    display: flex;
    gap: 1rem;
    @media (max-width: 500px) {
      display: none;
    }
    select {
      border: none;
      border-radius: 4px;
      padding: 0px 0.6rem;
      box-shadow: 0 0 10px rgb(0 0 0 / 15%);
      @media (max-width: 500px) {
        display: none;
      }
    }
  }

  @media (max-width: 500px) {
    left: 0px !important;
    right: 0px !important;
    top: auto !important;
    gap: 1rem;
    justify-content: center;
  }
`;
export const Main = styled.section<{
  /**@alias `grid-template-colums` */
  gtc?: string
  }>`
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    display: grid;
    margin: 6rem 0 6rem 0;
    grid-template-columns: ${(props) => props.gtc ? props.gtc : '0px 0px 0px'} ;
    grid-row-gap: 3rem;
    padding: 0 2rem;
    justify-items: center;
    align-content: center;
    align-items: center;
    justify-content: space-around;

  span {
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: var(--fg);
    line-height: 1.5;
    letter-spacing: 0.00938em;
  }

  @media (max-width: 500px) {
    left: 0px !important;
    right: 0px !important;
    top: auto !important;
    gap: 1rem;
    justify-content: center;
  }
`;

export const Center = styled.div`
        width: 100%;
    min-height: 100vh;
    background: var(--bg);
    display: grid;
    grid-template-columns: 100%;
    padding: 4.5rem 2rem;
    justify-content: center;
    align-items: center;
    justify-items: center;
    align-content: center;
`;

export const Status = styled.div`
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: #fff !important;
  line-height: 1.5;
  letter-spacing: 0.00938em;
`;