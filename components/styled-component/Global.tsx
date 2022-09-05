import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  /**min-height: 100vh; */
  background: var(--bg);
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 800px) {
    padding: 0px !important;
  }

`;

export const VhContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh; 
  background: var(--bg);
  align-items: flex-start;
  flex-direction: column;
  @media (max-width: 800px) {
    padding: 0px !important;
    width: 100% !important;
  }
`;
//#CCCCCC light grey
  export const ControlledInput = styled.input<{customHeight?: string}>`
    margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: .9rem;
    color: var(--fg);
    line-height: 1.5;
    letter-spacing: 0.00938em;
    border: transparent;
    width: 100%;
    height: ${(props) => !props.customHeight ? 40 :  props.customHeight}px;
    background: var(--txt);
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
    background: var(--sw);
    border-radius: 50px;
    align-items: center;
`;

export const UserBadge = styled.div`
    background: #eee;
    color: var(--sw);
    height: 40px;
    padding: 0px 25px;
    width:min-content;
    display: flex;
    text-transform: lowercase;
    border-radius: 50px;
    font-weight: 500;
    align-items: center;
    justify-content: space-evenly;
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

export const CustomColor = styled.span`
    padding: 0px 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .8rem;
    margin: 0;
    width: 100%;

    input[type="text"]{
      background-color: var(--txt);
      color: #555;
    }

    input[type="color"]{
      height: 100%;
    }
`;

export const CustomSelect = styled.select`
    padding: 10px 8px;
    background: #eee;
    width: inherit;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: .9rem;
    font-weight: 400;
    color: #555;
    line-height: 1.5;

    &:focus-within {
      border: none;
    }

    &:focus-within {
      border: 1px solid var(--bg);
    }
`;

export const Top = styled.div`
  display: flex;
  padding: 0.5rem 3rem;
  background: var(--bg);
  border-bottom: 1px solid #2221;
  align-items: center;
  width: 100%;
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

  @media (max-width: 1500px) {
    left: 0px !important;
    right: 0px !important;
    top: auto !important;
    padding: 10px 2rem;
  }
`;

export const List = styled.div`
    width: 100%;
    display: flex;
    height: max-content;
    padding: 5rem 15rem;
    flex-direction: column;
    background: var(var(--bg));
    gap: 1rem;
    padding-bottom: 2rem;
    flex-wrap: nowrap;
    justify-content: space-evenly;

    @media (max-width: 800px) {
      padding: 1rem 3rem;
    }
    
    span {
      color: var(--fg)
    }

  @media (max-width: 1000px) {
    padding: 0px 1rem !important;
  }
`;