import styled from "styled-components";

export const PropertyEditor = styled.div`
  position: fixed;
  right: 0;
  left: 1080px;
  bottom: 0;
  display: flex;
  top: 4rem;
  height: 100vh;
  background: #fff;
  border-left: 1px solid #ddd;
  flex-direction: column;
  justify-content: flex-start;
  //gap: 1rem;
`;

export const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  color: #555;
  padding: 1rem 0px 1rem 0px;
  border-bottom: 1px solid #eee;
  letter-spacing: 0.00938em;
`

export const Property = styled.div`
  width: 100%;
 // height: 30px;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: .5rem;
  justify-content: center;
  border-bottom: 1px solid #eee;
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
    padding: .5rem;
    color: rgba(0,0,0,0.6);
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    position: relative;
  }

  input[type="text"] {
  height: 34px;
  width: 100%;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 1rem;
  color: rgb(255 255 255);
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  background: transparent;
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
