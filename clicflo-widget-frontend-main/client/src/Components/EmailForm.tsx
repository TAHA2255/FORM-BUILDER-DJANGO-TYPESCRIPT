import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldContext } from "../Helpers/FieldContext";
import { GenerateHTMLString } from "../Helpers/EXTRACT/GenerateHTMLString";
import axios from "axios";
import WidgetButton from "../Utils/WidgetButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  border-radius: 15px;
  align-items: center;
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
  @media screen and (max-width: 414px) {
    height: auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

const BoldLabel = styled.label`
  margin: 10px 0;
  font-weight: 600;
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
  border-radius: 30px;
  background-color: rgb(241, 241, 241);
  width: 277px; /* Adjust the width as needed */
  padding: 9px 11px;
  box-shadow: 0 0 5px rgb(202, 202, 202); /* Box shadow with slight transparency */
  border: 1px solid rgb(202, 202, 202); /* Light grey border */

  /* Responsive styling for mobile devices */
  @media screen and (max-width: 414px) {
    width: 250px; /* Full width on mobile */
  }
`;

const MessageInput = styled.input`
  border-radius: 20px;
  background-color: rgb(241, 241, 241);
  width: 277px; /* Adjust the width as needed */
  height: 79px;
  padding: 8px 10px;
  box-shadow: 0 0 8px rgb(202, 202, 202); /* Box shadow with slightly more visibility */
  border: 1px solid rgb(202, 202, 202); /* Light grey border */

  /* Responsive styling for mobile devices */
  @media screen and (max-width: 414px) {
    width: 250px; /* Full width on mobile */
  }
`;

const Button = styled.button`
  border-radius: 15px;
  padding: 13px 15px;
  color: white;
  background-color: rgb(205, 41, 4);
  border: none;
  align-self: center;
  margin-top: 10px;
  width: 100px;
  cursor: pointer;
  margin-top: 15px;
  ${({ appearance }) =>
    appearance.submit
      ? `

        background-color: ${appearance.submit.accentColor}
       
      `
      : `
       
        color: 'black';
      `};
`;

const RedAsterisk = styled.span`
  color: red;
  margin-left: 5px;
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

const EmailForm = () => {
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
          EmailForm,
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
            form_name: formName,
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

  //  const handleSubmit = (event) => {
  //    event.preventDefault();
  //    const formData = new FormData(event.target);
  //    const data = {};
  //    formData.forEach((value, key) => {
  //      data[key] = value;
  //    });
  //    console.log(data);
  //  };

  return (
    <Container appearance={appearance}>
      <Wrapper>
        <FormBox id="myform">
          <BoldLabel htmlFor="name" appearance={appearance}>
            Name<RedAsterisk>*</RedAsterisk>
          </BoldLabel>
          <SmallInput type="text" name="name" placeholder="John Doe" />

          <BoldLabel htmlFor="email" appearance={appearance}>
            Email<RedAsterisk>*</RedAsterisk>
          </BoldLabel>
          <SmallInput
            type="email"
            name="email"
            placeholder="example@domain.com"
          />

          <BoldLabel htmlFor="subject" appearance={appearance}>
            Subject<RedAsterisk>*</RedAsterisk>
          </BoldLabel>
          <SmallInput
            type="text"
            name="subject"
            placeholder="Subject of Mail"
          />

          {newField.length > 0 &&
            newField.map((field, index) => (
              <DynamicField
                required={field.required}
                key={index}
                label={field.label}
                placeholder={field.placeholder}
                type="text"
                name={`dynamicField${index}`}
                appearance={appearance}
              />
            ))}

          <BoldLabel htmlFor="message" appearance={appearance}>
            Message<RedAsterisk>*</RedAsterisk>
          </BoldLabel>
          <MessageInput type="text" name="message" placeholder="Body of Mail" />

          <Button appearance={appearance} id="formSubmitBtn" type="submit">
            {formElements?.submitButton?.text
              ? formElements.submitButton.text
              : "Send"}
          </Button>
          <WidgetButton />
        </FormBox>
      </Wrapper>
    </Container>
  );
};

export default EmailForm;
