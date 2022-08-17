import styled from "styled-components";

export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0px 1rem;

  @media (max-width: 500px) {
    padding: 0px !important;
  }
`;

export const List = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0px 5rem;
  flex-direction: column-reverse;
  gap: 1rem;
  margin-top: 5rem;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media (max-width: 500px) {
    padding: 0px !important;
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
  //width: 250px;
  //height: 200px;
  background: --fg;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
`;

export const Top = styled.div`
  right: 0;
  left: 250px;
  display: flex;
  padding: 0.5rem 3rem;
  background: --bg;
  border-bottom: 1px solid #2221;
  align-items: center;
  position: fixed;
  z-index: 100;
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

  @media (max-width: 500px) {
    left: 0px !important;
    right: 0px !important;
    top: auto !important;
  }
`;

export const Center = styled.div`
  margin: auto auto auto auto;
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
    color: #555;
    line-height: 1.5;
    letter-spacing: 0.00938em;

    @media (max-width: 500px) {
      font-size: 0.8em;
    }
  }
`;
