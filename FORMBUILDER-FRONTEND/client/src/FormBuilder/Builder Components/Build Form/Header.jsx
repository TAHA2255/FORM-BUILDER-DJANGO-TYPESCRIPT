import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import toggleOn from "../../../Constants/BuildIcons/toggleOn.png";
import toggleOff from "../../../Constants/BuildIcons/toggleOff.png";
import back from "../../../Constants/BuildIcons/back.png";
import BuildForm from "./BuildForm";
import { FieldContext } from "../../../Helpers/FieldContext";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Field2 = styled.div`
  display: flex;
  margin-right: 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  justify-content: space-between;
  padding: 5px 4px;
  background-color: rgb(41, 41, 41);
  align-items: center;
`;

const InputField = styled.input`
  padding: 3px 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 100%;
  margin-bottom: 4px;
  font-size: 18px;
  background-color: rgb(41, 41, 41);
  color: white;

  &::placeholder {
    color: white;
    font-weight: bold;
    font-size: 14px;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const InputField2 = styled.input`
  padding: 3px 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 100%;
  margin-bottom: 4px;
  font-size: 18px;
  background-color: rgb(41, 41, 41);
  color: white;

  &::placeholder {
    color: white;
    font-weight: bold;
    font-size: 14px;
  }
`;

const FieldsBox = styled.div`
  width: 80%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: black;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  justify-content: space-between;
  padding: 5px 4px;
  background-color: rgb(41, 41, 41);
`;

const Toggle = styled.img`
  width: 30px;
  margin-right: 5px;
  margin-bottom: 2px;
  cursor: pointer;
`;

const Back = styled.img`
  margin-top: 15px;
  width: 32px;
  align-self: flex-start;
  margin-left: 40px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const AddFieldButton = styled.button`
  margin-top: 10px;
  color: black;
  padding: 12px 10px;
  border-radius: 5px;
  background-color: #d4d4d4;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
`;

const Header = () => {
  const { formElements, setFormElements } = useContext(FieldContext);
  const [headerToggle, setHeaderToggle] = useState(
    formElements.header.isVisible
  );
  const [headerText, setHeaderText] = useState(false);
  const [buttonText, setbuttonText] = useState('')

  const [buildCalled, setBuildCalled] = useState(false);

  useEffect(() => {
    setFormElements({
      ...formElements,
      header: {
        ...formElements.header,
        isVisible: headerToggle,
        text: headerText,
      },
      submitButton: {
        ...formElements.submitButton,
        text: buttonText,
      },
    });
  }, [headerToggle, headerText, buttonText]);

  console.log(formElements);

  const handleToggle = () => {
    setHeaderToggle((prev) => !prev);
  };

  const handleHeaderTextChange = (e) => {
    setHeaderText(e.target.value);



  };

  return (
    <>
      {buildCalled ? (
        <BuildForm />
      ) : (
        <Container>
          <Back onClick={() => setBuildCalled(true)} src={back} />

          <FieldsBox>
            <Title>Customise Header</Title>
            <Field>
              <InputField2
                readOnly
                type="text"
                placeholder="Custom Header"
                style={{ width: "100%" }}
                name="header"
                minLength={3}
              />
              <Toggle
                onClick={handleToggle}
                src={headerToggle ? toggleOn : toggleOff}
              />
            </Field>
            {headerToggle && (
              <Field2>
                <InputField
                  type="text"
                  placeholder="Enter New Header"
                  style={{ width: "100%", height: "50px" }}
                  name="header"
                  minLength={3}
                  value={headerText}
                  onChange={handleHeaderTextChange}
                />
              </Field2>
            )}
          </FieldsBox>

          <FieldsBox>
            <Title>Customise Button</Title>
            <Field>
              <InputField2

                type="text"
                placeholder="Change Button Text"
                style={{ width: "100%" }}
                name="header"
                minLength={3}
                onChange={(e) => setbuttonText(e.target.value)}
              />
            </Field>
          </FieldsBox>
        </Container>
      )}
    </>
  );
};

export default Header;
