import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/menu grid.png";

const Container = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(21, 62, 121);
  color: white;
`;

const Left = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Title = styled.h5`
  font-size: 20px;
  font-weight: bold;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  margin-right: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem2 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  margin-right: 10px;
  @media (min-width: 769px) {
    display: none;
  }
`;


const SignUp2 = styled.button`

  padding: 10px 20px;
  background-color: white;
  color: black;
  border-radius: 17px;
  margin-right: 10px;
  margin-left: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ResponsiveMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: rgb(21, 62, 121);
  color: white;
  padding: 10px;
  margin-right: 10px;
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out,
    visibility 0s linear ${({ isOpen }) => (isOpen ? "0s" : "0.3s")};
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      <Left>
        <Logo src={logo} />
        <Title>Clicflo Widgets</Title>
      </Left>

      <Right>
        <MenuItem>Home</MenuItem>
        <MenuItem>Widgets</MenuItem>
        <MenuItem>Form</MenuItem>
        <MenuItem>Contact Us</MenuItem>
        <SignUp2>Sign Up</SignUp2>
        <ResponsiveMenu onClick={toggleMenu}>
          <span style={{ marginRight: 1, cursor: 'pointer' }}>&#9776;</span>
        </ResponsiveMenu>
        <DropdownMenu isOpen={menuOpen}>
          <MenuItem2>Home</MenuItem2>
          <MenuItem2>Widgets</MenuItem2>
          <MenuItem2>Form</MenuItem2>
          <MenuItem2>Contact Us</MenuItem2>
          <MenuItem2>Sign Up</MenuItem2>
        </DropdownMenu>
      </Right>
    </Container>
  );
};

export default Navbar;
