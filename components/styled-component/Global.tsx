import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  background: #eee;
  align-items: flex-start;
  flex-direction: column;
`;

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
    width: 200px;
    display: flex;
    border-radius: 50px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
`;