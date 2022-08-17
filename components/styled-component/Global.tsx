import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  /**height: 100vh; */
  background: --bg;
  align-items: flex-start;
  flex-direction: column;
`;

export const VhContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100vh; 
  background: --bg;
  align-items: flex-start;
  flex-direction: column;
`;
//#CCCCCC light grey
  export const ControlledInput = styled.input<{customHeight?: string}>`
        margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: .9rem;
    color: #555;
    line-height: 1.5;
    -webkit-letter-spacing: 0.00938em;
    -moz-letter-spacing: 0.00938em;
    -ms-letter-spacing: 0.00938em;
    letter-spacing: 0.00938em;
    border: transparent;
    width: 100%;
    height: ${(props) => !props.customHeight ? 40 :  props.customHeight}px;
    background: #eee;
    border-radius: 4px;
    padding: 1rem;
    border: 1px solid;
    border-color: transparent;

    :hover, :focus-within {
      outline: none;
      border: rgba(0, 17, 255, 0.164);
    }

   :hover , :focus-visible,
   :focus,  :focus-within {
       border: 1px solid #2124B1;
       background: rgba(0, 17, 255, 0.164);
       transition: background 0.1s ease-in-out, border-color 0.2s ease-in-out;
    }
`;

export const Form = styled.div`
    margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    display: flex;
    gap: 1rem;
    font-size: 1.25rem;
    line-height: 1.6;
    letter-spacing: 0.0075em;
    flex-direction: column;
`;

export const SwitchContainer = styled.div`
    display: flex;
    gap: .1rem;
    padding: 0px 5px;
    color: #fff;
    background: #2124b1;
    border-radius: 50px;
    align-items: center;
`;

export const UserBadge = styled.div`
    background: #eee;
    color: #2124b1;
    height: 40px;
    padding: 0px 25px;
    width: 200px;
    display: flex;
    text-transform: lowercase;
    border-radius: 50px;
    font-weight: 500;
    align-items: center;
    justify-content: space-evenly;
`;

export const Center = styled.div`
  margin: auto auto auto auto;
`;

export const Top = styled.div`
  right: 0;
  left: 250px;
  display: flex;
  padding: .5rem 3rem;
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
    input[type="date"]{
      border: none;
      border-radius: 4px;
      width: 15px;
      height: inherit;
      padding: 0px 0.6rem;
      box-shadow: 0 0 10px rgb(0 0 0 / 15%);
    }
  }
`;

export const List = styled.div`
    width: 100%;
    display: flex;
    height: max-content;
    padding: 0px 15rem;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
    margin: 5rem 0px;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  @media (max-width: 500px) {
    padding: 0px !important;
  }
`;