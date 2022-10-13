import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(15, 15, 15, 0.6);
  background-color: #1c1c1c;
  color: #fff;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
`;

export const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 0.5em;
  border: none;
  border-bottom: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  font-size: 1.2em;
`;

export const ErrorText = styled.span`
  color: #eb5d5d;
  font-size: 18px;
  margin: 7px 0;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5em;
  border: none;
  border-radius: 0.5em;
  background-color: #eb5d5d;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #eb5d5d;

    transform: scale(1.05);
  }
`;
