import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldContext } from "../Helpers/FieldContext";
import { GenerateHTMLString } from "../Helpers/EXTRACT/GenerateHTMLString";
import axios from "axios";
import WidgetButton from "../Utils/WidgetButton";

const Container = styled.div`
  font-family: "Roboto", serif; /* Use Domine font for body text */
  border-radius: 15px;
  width: 90%;
  margin: auto; /* Center the container horizontally */
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
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Center the content horizontally */

  /* Add margin or padding as needed */
  margin-top: 50px; /* Example margin top */
  padding: 20px; /* Example padding */
  @media screen and (max-width: 414px) {
    margin-top: 0px; /* Example margin top */
    padding: 0px; /* Example padding */
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

const BoldLabel = styled.label`
  margin: 10px 0;
  font-weight: bold;
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
  margin-bottom: 10px;
  margin-right: 10px;
  width: 26%; /* Take full width of the input group */
  padding: 9px 11px;
  box-shadow: 0 0 5px rgb(202, 202, 202);
  border: 1px solid rgb(202, 202, 202);

  /* Responsive styling for mobile devices */
  @media screen and (max-width: 414px) {
    width: 100%; /* Full width on mobile */
  }
`;

const MessageInput = styled.textarea`
  width: 53%; /* Take full width of the input group */
  height: 130px;
  padding: 8px 10px;
  box-shadow: 0 0 8px rgb(202, 202, 202);
  border: 1px solid rgb(202, 202, 202);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 13px 20px;
  color: white;
  background-color: black;
  border: none;
  width: 100px;
  align-self: center;
  cursor: pointer;
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


const DynamicField = ({ label, placeholder, type, required, appearance, name }) => {
  return (
    <>
      <BoldLabel htmlFor={label} appearance={appearance}>
        {label} {required && <RedAsterisk style={{color: 'red', marginLeft: '5px'}}>*</RedAsterisk>}
      </BoldLabel>
      <div style={{ display: "flex" }}>
        <SmallInput
          style={{ width: "40%" }}
          type={type}
          placeholder={placeholder}
          required={required}
          name={name}
        />
      </div>
    </>
  );
};

const ExtendedForm = () => {
  const { newField, appearance, getForm, setFormLink, formElements } =
    useContext(FieldContext);

  const contextValue = { newField, appearance };

  const [isMobile, setIsMobile] = useState(false);
  const [notMobile, setNotMobile] = useState(true);

  const [htmlFormId, setHtmlFormId] = useState("");
  const [finalForm, setfinalForm] = useState("");

  const baseUrl = import.meta.env.VITE_baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      if (getForm) {
        const { htmlString, styles } = GenerateHTMLString(
          ExtendedForm,
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

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth <= 768;
      setIsMobile(isMobileSize);
      setNotMobile(!isMobileSize); // Set notMobile based on isMobileSize
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


   const handleSubmit = (event) => {
     event.preventDefault();
     const formData = new FormData(event.target);
     const data = {};
     formData.forEach((value, key) => {
       data[key] = value;
     });
     console.log(data);
   };

  return (
    <>
      {notMobile && (
        <Container appearance={appearance}>
          <Wrapper>
            <FormBox onSubmit={handleSubmit} id="myform">
              <BoldLabel htmlFor="firstName" appearance={appearance}>
                Full Name
              </BoldLabel>
              <div style={{ display: "flex" }}>
                <SmallInput
                  type="text"
                  name="firstName"
                  style={{ width: "40%" }}
                  placeholder="John"
                />
                <SmallInput
                  type="text"
                  name="lastName"
                  style={{ width: "40%" }}
                  placeholder="Doe"
                />
              </div>

              <BoldLabel htmlFor="address" appearance={appearance}>
                Address
              </BoldLabel>
              <SmallInput
                type="text"
                name="streetAddress"
                style={{ width: "83%" }}
                placeholder="Street Address *"
              />

              <div style={{ display: "flex" }}>
                <SmallInput
                  type="text"
                  name="city"
                  style={{ marginTop: "15px" }}
                  placeholder="City"
                />
                <SmallInput
                  type="text"
                  name="state"
                  style={{ marginTop: "15px" }}
                  placeholder="State"
                />
                <SmallInput
                  type="text"
                  name="zipCode"
                  style={{ marginTop: "15px" }}
                  placeholder="Zip Code"
                />
              </div>

              <BoldLabel htmlFor="contactInfo" appearance={appearance}>
                Contact Information
              </BoldLabel>
              <div style={{ display: "flex" }}>
                <SmallInput
                  type="text"
                  name="email"
                  style={{ width: "40%" }}
                  placeholder="Email *"
                />
                <SmallInput
                  type="text"
                  name="phone"
                  style={{ width: "40%" }}
                  placeholder="Phone"
                />
              </div>

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
                Questions / Comments
              </BoldLabel>
              <MessageInput
                type="text"
                name="message"
                style={{ width: "82%" }}
                placeholder="Message"
              />

              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <SmallInput
                  type="checkbox"
                  name="subscribe"
                  style={{ width: "15px", height: "15px" }}
                />
                <p style={{ color: "grey", fontSize: "13px" }}>
                  Update me on deals and special offers via email
                </p>
              </div>

              <Button appearance={appearance} id="formSubmitBtn" type="submit">
                {formElements?.submitButton?.text
                  ? formElements.submitButton.text
                  : "Submit"}
              </Button>
              <WidgetButton />
            </FormBox>
          </Wrapper>
        </Container>
      )}

      {isMobile && (
        <Container appearance={appearance}>
          <Wrapper>
            <FormBox onSubmit={handleSubmit} id="myform">
              <BoldLabel htmlFor="firstName" appearance={appearance}>
                Full Name
              </BoldLabel>
              <SmallInput type="text" name="firstName" placeholder="John" />
              <SmallInput type="text" name="lastName" placeholder="Doe" />

              <BoldLabel htmlFor="address" appearance={appearance}>
                Address
              </BoldLabel>
              <SmallInput
                type="text"
                name="streetAddress"
                placeholder="Street Address *"
              />
              <SmallInput type="text" name="city" placeholder="City" />
              <SmallInput type="text" name="state" placeholder="State" />
              <SmallInput type="text" name="zipCode" placeholder="Zip Code" />

              <BoldLabel htmlFor="contactInfo" appearance={appearance}>
                Contact Information
              </BoldLabel>
              <SmallInput type="text" name="email" placeholder="Email *" />
              <SmallInput type="text" name="phone" placeholder="Phone" />

              <BoldLabel htmlFor="message" appearance={appearance}>
                Questions / Comments
              </BoldLabel>
              <MessageInput
                type="text"
                name="message"
                style={{ width: "100%" }}
                placeholder="Message"
              />

              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <SmallInput
                  type="checkbox"
                  name="subscribe"
                  style={{ width: "15px", height: "15px" }}
                />
                <p style={{ color: "grey", fontSize: "13px" }}>
                  Update me on deals and special offers via email
                </p>
              </div>

              <Button appearance={appearance} id="formSubmitBtn" type="submit">
                {formElements?.submitButton?.text
                  ? formElements.submitButton.text
                  : "Submit"}
              </Button>
              <WidgetButton />
            </FormBox>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default ExtendedForm;
