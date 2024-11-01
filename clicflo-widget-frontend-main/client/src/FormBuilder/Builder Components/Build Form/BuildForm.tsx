import styled from "styled-components";
import dots from "../../../Constants/BuildIcons/dots.png";
import rightArrow from "../../../Constants/BuildIcons/rightArrow.png";
import { useState } from "react";
import AddField from "./AddField";

import back from "../../../Constants/BuildIcons/back.png";
import Header from "./Header.tsx";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FieldsBox = styled.div`
  width: 80%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: rgb(41, 41, 41);
`;
const FieldsBox2 = styled.div`
  width: 80%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: rgb(41, 41, 41);
  margin-top: 50px;
`;

const Field = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  padding: 0 4px;
`;

const FieldName = styled.h6`
  margin-left: 5px;
  padding: 1px;
  font-size: 15px;
  font-weight: 900;
`;

const Dots = styled.img`
  width: 19px;
  height: 20px;
  cursor: pointer;
`;

const AddFieldButton = styled.button`
  margin-top: 10px;
  color: rgb(92, 145, 186);
  padding: 5px 10px;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  outline: none;

  font-weight: bold;
  font-size: 20px;

  cursor: pointer;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Desc = styled.p`
  align-self: flex-start;
  margin-left: 38px;
  font-weight: bold;
`;

const Back = styled.img`
  margin-top: 15px;
  width: 32px;
  align-self: flex-start;
  margin-left: 40px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out; /* Add transition effect */
  &:hover {
    transform: scale(1.1);
  }
`;

const BuildForm = () => {
  const [fieldCalled, setFieldCalled] = useState(false);

  const [headerCalled, setHeaderCalled] = useState(false);

  const handleBackClick = () => {
    window.location.reload(); // This will reload the page
  };

  return (
    <Container>
      {headerCalled ? (
        <Header />
      ) : fieldCalled ? (
        <AddField />
      ) : (
        <>
          <Back onClick={handleBackClick} src={back} />
          <Title>Build Form</Title>

          <Desc style={{ marginTop: "10px" }}>Fields</Desc>
          <FieldsBox>
            <Field>
              <FieldName>Full Name</FieldName>
              <Dots src={dots} />
            </Field>
            <Field>
              <FieldName>Address</FieldName>
              <Dots src={dots} />
            </Field>
            <Field>
              <FieldName>Contact</FieldName>
              <Dots src={dots} />
            </Field>
            <Field>
              <FieldName>Questions</FieldName>
              <Dots src={dots} />
            </Field>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AddFieldButton onClick={() => setFieldCalled(true)}>
                Add Field +
              </AddFieldButton>
            </div>
          </FieldsBox>

          <FieldsBox2>
            <Field>
              <FieldName>Header</FieldName>
              <Dots src={rightArrow} onClick={() => setHeaderCalled(true)} />
            </Field>
            <Field>
              <FieldName>Footer</FieldName>
              <Dots src={rightArrow} />
            </Field>
            <Field>
              <FieldName>Submit Button</FieldName>
              <Dots src={rightArrow} onClick={() => setHeaderCalled(true)} />
            </Field>
          </FieldsBox2>
        </>
      )}
    </Container>
  );
};

export default BuildForm;