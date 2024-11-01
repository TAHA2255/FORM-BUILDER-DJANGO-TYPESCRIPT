import styled from "styled-components";
import cross from "../assets/cross.png";

import { useContext, useEffect, useState } from "react";
import { FieldContext } from "../Helpers/FieldContext";
import { GenerateHTMLString } from "../Helpers/EXTRACT/GenerateHTMLString";
import axios from "axios";
import WidgetButton from "../Utils/WidgetButton";

const Container = styled.div`
  font-family: "Roboto", serif; /* Use Domine font for body text */
  display: flex;
  margin-left: 235px;
  background-color: white;
  ${({ appearance }) =>
    appearance.theme === "Dark"
      ? `
      background-color: black;
        color: white;
       
      `
      : `
         background-color: white;
        color: black;
      `};

  ${({ appearance }) =>
    appearance.background
      ? `

           background-color: ${appearance.background.accentColor}
       
      `
      : `
       
           background-color: white;
      `};

  @media (max-width: 768px) {
    margin-left: 0; /* Remove left margin on smaller screens */
    justify-content: flex-end; /* Align content to the right */
  }
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 15vw;
  overflow: hidden;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 100%; /* Take full width on smaller screens */
  }
`;

const BoldLabel = styled.label`
  margin: 10px 0;
  font-weight: bold;
  margin-top: 15px;
  ${({ appearance }) =>
    appearance.component === "label"
      ? `

        color: ${appearance.accentColor}
       
      `
      : `
       
        color: black;
      `};

  ${({ appearance }) =>
    appearance.label
      ? `

        color: ${appearance.label.accentColor}
       
      `
      : `
       
        color: black;
      `};
`;

const SmallInput = styled.input`
  width: 170px;
  padding: 9px 11px;
  margin-top: 2px;
  border: none;
  border-bottom: 1px solid rgb(202, 202, 202);
  outline: none;
  text-align: center;

  @media screen and (max-width: 414px) {
    width: 250px;
  }
`;

const Button = styled.button`
  padding: 9px 15px;
  color: white;
  background-color: rgb(60, 92, 255);
  border: none;
  align-self: center;
  margin-top: 10px;
  width: 100px;
  cursor: pointer;
  ${({ appearance }) =>
    appearance.submit &&
    `

        background-color: ${appearance.submit.accentColor}
       
      `};
`;

const RedAsterisk = styled.span`
  color: red;
  margin-left: 5px;
`;

const ToggleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const Span = styled.span`
  color: white;
`;

const Toggle = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 10px;
`;
const DynamicField = ({
  label,
  placeholder,
  type,
  required,
  appearance,
  name,
}) => {
  return (
    <>
      <BoldLabel htmlFor={label} appearance={appearance}>
        {label}{" "}
        {required && (
          <RedAsterisk style={{ color: "red", marginLeft: "5px" }}>
            *
          </RedAsterisk>
        )}
      </BoldLabel>
      <SmallInput
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
    </>
  );
};

const FloatingForm = () => {
  const { newField, appearance, getForm, setFormLink, formElements } =
    useContext(FieldContext);

  const contextValue = { newField, appearance };
  const [htmlFormId, setHtmlFormId] = useState("");
  const [finalForm, setfinalForm] = useState("");

  const baseUrl = import.meta.env.VITE_baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      if (getForm) {
        const { htmlString, styles } = GenerateHTMLString(
          FloatingForm,
          {}, // Assuming this is your context value
          contextValue // Assuming this is your context value
        );

        const finalHtmlString = `
          <div>
        
            ${htmlString}
          </div>
        `;

        const finalCss = `
            ${styles}
        `;

        const formName = prompt("Enter the form name");
        try {
          const response = await axios.post(`${baseUrl}embed-code/create/`, {
            html: finalHtmlString,
            css: finalCss,
            form_nameL: formName,
          });
          setHtmlFormId(response.data.id);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [getForm, baseUrl]); // Include getForm and baseUrl in the dependency array

  useEffect(() => {
    const retrieveHtml = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}embed-code/${htmlFormId}/retrieve/`
        );

        setfinalForm(response.data.html);
      } catch (error) {
        console.log(error);
      }
    };

    if (htmlFormId) {
      retrieveHtml(); // Call retrieveHtml only when htmlFormId is set
    }
  }, [htmlFormId, baseUrl]); // Watch for changes in htmlFormId and baseUrl

  // Add a new useEffect to watch for changes in finalForm
  useEffect(() => {
    if (finalForm) {
      // alert(finalForm); // Alert the updated finalForm
      setFormLink(finalForm);
    }
  }, [finalForm]); // Watch for changes in finalForm

  return (
    <Container className="container" appearance={appearance}>
      <Wrapper className="wrapper" id="myform">
        <ToggleBox>
          <Span></Span>
          <Toggle src={cross} />
        </ToggleBox>

        <BoldLabel htmlFor="firstName" appearance={appearance}>
          What's Your Name? <RedAsterisk>*</RedAsterisk>
        </BoldLabel>
        <SmallInput type="text" name="firstName" placeholder="John Doe" />

        <BoldLabel htmlFor="email" appearance={appearance}>
          What's Your Email?<RedAsterisk>*</RedAsterisk>
        </BoldLabel>
        <SmallInput
          type="email"
          name="email"
          placeholder="example@domain.com"
        />

        <BoldLabel htmlFor="help" appearance={appearance}>
          How can we help you? <RedAsterisk>*</RedAsterisk>
        </BoldLabel>
        <SmallInput
          type="text"
          name="help"
          placeholder="Your questions or comments"
        />

        {newField.length > 0 &&
          newField.map(
            (field, index) =>
              field.label && (
                <DynamicField
                  required={field.required}
                  key={index}
                  label={field.label}
                  placeholder={field.placeholder}
                  type="text"
                  name={`dynamicField${index}`}
                  appearance={appearance}
                />
              )
          )}

        <Button appearance={appearance} id="formSubmitBtn" type="submit">
          {formElements?.submitButton?.text
            ? formElements.submitButton.text
            : "Send"}
        </Button>
      </Wrapper>
    </Container>
  );
};

// const renderToStaticHTML = () => {
//   const htmlString = ReactDOMServer.renderToString(<FloatingForm />);
//   return htmlString;
// };
// const staticHTML = renderToStaticHTML();
// console.log(staticHTML); // Output the static HTML to console or use it as needed

export default FloatingForm;
