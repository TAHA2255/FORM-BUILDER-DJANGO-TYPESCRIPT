import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SimpleForm from "../Components/SimpleForm";
import FloatingForm from "../Components/FloatingForm";
import EmailForm from "../Components/EmailForm";
import ExtendedForm from "../Components/ExtendedForm";
import Builder from "../FormBuilder/Builder";
import Toast from "../Helpers/Toast";
import { FieldContext } from "../Helpers/FieldContext";
import desktop from "../assets/desktop.png";
import mobile from "../assets/phone.png";
import useDoubleClickSimulation from "../Helpers/useDoubleClickSimulation";


interface ContainerProps {
  active?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  height: auto;
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  background: rgb(0, 199, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 199, 255, 1) 0%,
    rgba(1, 114, 255, 1) 100%
  );
`;

const Wrapper = styled.div`
  margin-top: 10px;
`;

const Title = styled.h1`
  margin-top: 15px;
  color: white;
  font-weight: bold;
  font-size: 30px;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 20px;
    margin: 0 20px;
  }
`;

const Span = styled.span`
  color: rgb(22, 63, 128);
`;

const Desc = styled.p`
  margin-top: 15px;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 22px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const FormBox = styled.div`
  max-width: 100%;
  width: 800px; /* Add this */
  border-radius: 20px;
  background-color: white;
  margin-top: 30px;
  height: auto;
  @media (max-width: 768px) and (max-width: 900px) {
    margin: 22px;
    /* height: 110vh; */
    height: auto;
  }
  @media screen and (max-width: 414px) {
    width: auto;
  }
`;

interface FormBoxWrapperProps {
  activeMenuItem: number | null;
}

const FormBoxWrapper = styled.div<FormBoxWrapperProps>`
  /* Add your form box wrapper styles here */
  display: flex;
  height: auto;
  width: 100%;
  background-color: ${(props) =>
    props.activeMenuItem === 2 || props.activeMenuItem === 1
      ? "#A2A2A280"
      : "transparent"};

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;

    align-items: ${(props) =>
      props.activeMenuItem === 2 ? "flex-end" : "center"};
  }
`;

const FormTitle = styled.h4`
  font-size: 27px;
  color: rgb(62, 96, 144);
  text-align: center;
  font-weight: bold;
`;

const Left = styled.div`
  /* height: 100%; */
  width: 40%;
  border-radius: 19px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const NewTitle = styled.h4`
  font-size: 17px;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 3px solid white;
  text-align: center;
  width: 100%;
`;

interface MenuItemProps {
  active?: boolean;
}

const MenuItemRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const MenuItem = styled.div<MenuItemProps>`
  font-size: 17px;
  cursor: pointer;
  padding: 20px;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s ease;
  border-bottom: 3px solid white;
  font-weight: bold;
  ${(props) =>
    props.active &&
    `
    color: rgb(3, 176, 227);
  `}
  @media (max-width: 768px) {
    border-bottom: 0;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;

const SelectBtn = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  color: white;
  background-color: rgb(28, 156, 0);
  padding: 14px 20px;
  border-radius: 21px;
  bottom: 10px;
  font-size: 15px;
  font-weight: bold;

  margin: 20px 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Right = styled.div<FormBoxWrapperProps>`
    /* width: ${(props) => (props.activeMenuItem === 1 ? "100%" : "65%")}; */
    width: 65%;
  display: flex;
  flex-direction: column;
  position: relative; /* Ensure relative positioning for absolute child */
  margin: 20px;
  height: 100%;
  margin: ${(props) => (props.activeMenuItem === 2 ? "0" : "20px")};

  @media (max-width: 414px){
    width: 100%;
  }

`;

const ImageButton = styled.img`
  position: absolute;
  top: -15px;
  right: -14px;
  z-index: 999; /* Ensure it appears above other elements */
  cursor: pointer;
  width: 40px;

  @media (max-width: 414px){

    display: none;
  }
`;

// const useDoubleClickSimulation = (onClick) => {
//   const [clickCount, setClickCount] = useState(0);
//   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
//   const handleClick = useCallback(() => {
//     setClickCount(clickCount + 1);

//     if (clickCount === 1) {
//       setTimer(
//         setTimeout(() => {
//           // Perform single click action here
//           onClick();
//           setClickCount(0); // Reset click count
//         }, 300)
//       ); // Wait for 300ms for a second click
//     } else if (clickCount === 2) {
//       clearTimeout(timer); // Clear the timer if a second click occurs
//       // Perform double click action here
//       onClick();
//       setClickCount(0); // Reset click count
//     }
//   }, [clickCount, onClick, timer]);

//   return handleClick;
// };

const FormsPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [notMobile, setNotMobile] = useState(true);
  const [openBuilderPage, setopenBuilderPage] = useState(false);

  const [desktopicon, setdesktopicon] = useState(true);

  const { formLink, setGetForm, getForm, setIsDesktopIconVisible } =
    useContext(FieldContext);

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth <= 768;
      setIsMobile(isMobileSize);
      setNotMobile(!isMobileSize); // Set notMobile based on isMobileSize
    };

    setActiveMenuItem(1);

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuItemClick = (index: number) => {
    setActiveMenuItem(index);
  };

 const handleGetFormClick = () => {
   setGetForm(!getForm);
 };
  return (
    <Container>
      <Wrapper>
        <Title>
          Embed Custom <Span> Widgets </Span>on Your Website{" "}
          <Span>Effortlessly</Span>
        </Title>
        <Desc>
          Enhance Your Website's Functionality <br />
          with{" "}
          <Span>
            <b>Clicflo Widgets</b>
          </Span>
        </Desc>

        <FormBox>
          <FormTitle>Contact Form</FormTitle>
          
          {formLink && <Toast />}

          <hr />
          <FormBoxWrapper activeMenuItem={activeMenuItem}>
            {notMobile && (
              <>
                {openBuilderPage ? (
                  <Builder />
                ) : (
                  <Left>
                    <h3 style={{ textAlign: "center", margin: "14px 0px" }}>
                      Select Template
                    </h3>
                    <MenuItem
                      onClick={() => handleMenuItemClick(1)}
                      active={activeMenuItem === 1}
                    >
                      Simple Form
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuItemClick(2)}
                      active={activeMenuItem === 2}
                    >
                      Floating Form
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuItemClick(3)}
                      active={activeMenuItem === 3}
                    >
                      Email Form
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleMenuItemClick(4)}
                      active={activeMenuItem === 4}
                    >
                      Extended Form
                    </MenuItem>
                    <BtnBox></BtnBox>
                    <BtnBox>
                      <SelectBtn onClick={() => setopenBuilderPage(true)}>
                        Form Builder
                      </SelectBtn>
                    </BtnBox>
                    <BtnBox>
                      <SelectBtn onClick={handleGetFormClick}>
                        Select Template
                      </SelectBtn>
                    </BtnBox>
                  </Left>
                )}
              </>
            )}

            <Right activeMenuItem={activeMenuItem} >
              {activeMenuItem === 1 && (
                <ImageButton
                  src={desktopicon ? mobile : desktop}
                  alt="Button Image"
                  onClick={() => {
                    setdesktopicon(!desktopicon);
                    setIsDesktopIconVisible(desktopicon);
                  }}
                />
              )}

              {(() => {
                switch (activeMenuItem) {
                  case 1:
                    return <SimpleForm />;
                  case 2:
                    return <FloatingForm />;
                  case 3:
                    return <EmailForm />;
                  case 4:
                    return <ExtendedForm />;
                  default:
                    return <SimpleForm />;
                }
              })()}
            </Right>
          </FormBoxWrapper>
        </FormBox>
        {isMobile && (
          <Left>
            <NewTitle>Select Template</NewTitle>
            <MenuItemRow>
              <MenuItem
                onClick={() => handleMenuItemClick(1)}
                active={activeMenuItem === 1}
              >
                Simple Form
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick(2)}
                active={activeMenuItem === 2}
              >
                Floating Form
              </MenuItem>
            </MenuItemRow>
            <MenuItemRow>
              <MenuItem
                onClick={() => handleMenuItemClick(3)}
                active={activeMenuItem === 3}
              >
                Email Form
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick(4)}
                active={activeMenuItem === 4}
              >
                Extended Form
              </MenuItem>
            </MenuItemRow>

            <BtnBox>
              <SelectBtn>Select Template</SelectBtn>
            </BtnBox>
          </Left>
        )}
      </Wrapper>
    </Container>
  );
};

export default FormsPage;
