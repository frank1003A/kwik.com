import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  background: #eee;
  align-items: flex-start;
  flex-direction: column;
`;

  export const ControlledInput = styled.input`
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
    height: 40px;
    background: #eee;
    border-radius: 4px;
    padding: 1rem;

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
`