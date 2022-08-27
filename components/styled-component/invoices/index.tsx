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
export const Main = styled.section`
    width: 100%;
    height: 100vh;
    background: var(--bg);
    display: grid;
    grid-template-columns: 0px 0px 0px;
    padding: 4.5rem 2rem;
    justify-content: space-around;
    justify-items: center;
    align-items: center;

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
  margin: auto auto auto auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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