import styled from "styled-components";

export const PropertyEditor = styled.div`
  position: fixed;
  right: 0;
  left: 1080px;
  bottom: 0;
  display: flex;
  top: 4rem;
  height: 100vh;
  background: var(--prb);
  border-left: 1px solid var(--sbedge);
  flex-direction: column;
  justify-content: flex-start;
  //gap: 1rem;
  @media (max-width: 500px) {
    display: none;
  }
`;

export const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  //overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #eee;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--primarycolor);
    border-radius: 6px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--primarycolor);
  }
`;

export const Header = styled.section`
  width: 100%;
  display: flex;
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fg);
  padding: 0.6rem 0px;
  //border-bottom: 1px solid #eee;
  letter-spacing: 0.00938em;
`;

export const Property = styled.div`
  width: 100%;
  // height: 30px;
  background: var(--prp);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  border-bottom: 1px solid var(--prp);
  padding: 1rem 0px 1rem 0px;

  span {
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
    letter-spacing: 0.00938em;
    width: 100%;
    padding: 0px 1.5rem;
  }

  select {
    height: 35px;
    background-color: #eee;
    border: none;
    border-radius: 4px;
    width: 200px;
    padding: 0.5rem;
    color: #555;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    position: relative;
  }

  input[type="text"] {
    height: 34px;
    width: 100%;
    border: 1px solid var(--bg);
    border-radius: 4px;
    padding: 1rem;
    color: #555;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    background: #eee;
    letter-spacing: 0.00938em;
    position: relative;
  }
`;

export const CanvasProperty = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  div {
    display: flex;
    flex-direction: column;
    p {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.4375em;
      color: #555;
      letter-spacing: 0.00938em;
    }
  }
`;

export const NumberInput = styled.div`
  width: 50%;
  height: 40px;
  background: #eee;
  div {
    display: flex;
    input {
      width: 70%;
    }
  }
`;
