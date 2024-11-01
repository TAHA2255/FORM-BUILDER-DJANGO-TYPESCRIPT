import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldContext } from "./FieldContext";
import copy from "clipboard-copy";

const Container = styled.div`
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 70px;
  border: 1px solid green;
  background-color: #edffed;
  color: #005e00;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
`;

const Link = styled.a`
  font-size: 13px;
  color: #015501;
  text-align: center;
  margin-top: 7px;
`;

const CopyButton = styled.button`
  margin-bottom: 3px;
  overflow: hidden;
  position: absolute;
  top: 2px;
  right: 2px;
  padding: 7px 12px;
  background-color: #015501;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0s ease-in-out;

  &:hover {
    background-color: #014500;
  }
`;

const CrossImage = styled.img`
  width: 18px;
  position: absolute;
  top: 2px;
  right: 80px;
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  width: 30px;
  padding: 10px;
  justify-content: space-between;
`;

const Toast = () => {
  const { formLink, setGetForm } = useContext(FieldContext);
  const [isVisible, setIsVisible] = useState(true);

  const handleCopy = () => {
    copy(formLink);
    alert("Text copied to clipboard!");
  };

  const handleClose = () => {
    setIsVisible(false);
    setGetForm(false);
  };

  useEffect(() => {
    setIsVisible(true);
  }, [formLink]);

  return (
    <Container isVisible={isVisible}>
      <Link target="_blank" href={formLink}>
        {formLink}
      </Link>
      <Box>
        <CopyButton onClick={handleCopy} isVisible={isVisible}>
          Copy Link
        </CopyButton>
        <CrossImage
          src="https://i.ibb.co/P5yfmQH/redCross.png"
          onClick={handleClose}
        />
      </Box>
    </Container>
  );
};

export default Toast;
