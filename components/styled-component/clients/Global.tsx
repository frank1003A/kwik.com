import styled from "styled-components";

export const FlexContainer = styled.div`
      width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: flex-start;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const List = styled.div`
        width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    padding: 2rem 5rem;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: center;

  @media (max-width: 800px) {
    padding: 0px 0px !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
`;

export const Controls = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1rem;
`;

export const Card = styled.div`
     border-radius: 8px;
    padding: 1rem;
    background: var(--cd);
    box-shadow: var(--card-box-shadow);
    font-size: .9rem;
    text-align: center;

    svg {
      color: var(--sw)
    }

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const Top = styled.div`
     display: flex;
    width: 100%;
    padding: 0.5rem 3rem;
    background: var(--bg);
    border-bottom: 1px solid #2221;
    -webkit-box-align: center;
    align-items: center;
    z-index: 100;
    -webkit-box-pack: justify;
    justify-content: space-between;
  div {
    display: flex;
    gap: 1rem;
    select {
      border: none;
      border-radius: 4px;
      padding: 0px 0.6rem;
      box-shadow: 0 0 10px rgb(0 0 0 / 15%);
    }
  }

  @media (max-width: 1500px) {
    left: 0px !important;
    right: 0px !important;
    top: auto !important;
    padding: 10px 2rem;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  #clientname,
  #email {
    display: flex;
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    color: var(--fg);
    line-height: 1.5;
    letter-spacing: 0.00938em;

    @media (max-width: 500px) {
      font-size: 0.8em;
    }
  }
`;
