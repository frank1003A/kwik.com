import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  //gap: 2rem;
  background: var(--bg);
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 500px) {
      width: 100%;
    }

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
  display: flex;
  padding: 0.5rem 2rem;
  background: var(--bg);
  border-bottom: 1px solid #2221;
  align-items: center;
  width: 100%;
  z-index: 100;
  justify-content: space-between;

  div {
    display: flex;
    gap: 1rem;
    @media (max-width: 500px) {
      //display: none;
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
    gap: .2rem;
    width: max-content;
    justify-content: center;
    align-items: center;
  }
`;
export const Main = styled.section`
        width: 100%;
    min-height: 100vh;
    background: var(--bg);
    row-gap: 2.5rem;
    display: flex;
    flex-direction: row;
    padding: 2rem 3rem;
    justify-items: center;
    -webkit-box-align: center;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-wrap: wrap;

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
    grid-template-columns: 100%;
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

export const SideCreator = styled.div`
    width: 50%;
    padding: 2rem;
    background: #fff;
    overflow: auto;
`