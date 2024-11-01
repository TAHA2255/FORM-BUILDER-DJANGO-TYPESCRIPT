import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldContext } from "../Helpers/FieldContext";
import axios from "axios";
import redCross from "../assets/redCross.png";
import meter from "../assets/meter.png";

import SimpleFormHTML, {
  GenerateHTMLString,
} from "../Helpers/EXTRACT/GenerateHTMLString";
import WidgetButton from "../Utils/WidgetButton";

interface AppearanceProps {
  theme: string;
  component: string;
  accentColor: string;
}

const TopLevelWrapper = styled.div`
  padding: 15px;

  margin: 10px;
`;

const Container = styled.div`
  font-family: "Roboto", serif; /* Use Domine font for body text */
  max-width: ${({ isMobile }) => (isMobile ? "338px" : "800px")};
  margin: 0 auto;

  border-radius: 10px;
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
`;

const Title = styled.h3`
  font-weight: bold;
  font-size: 30px;
  margin-left: 40px;
  margin-bottom: 20px;
  margin-top: 20px;

   ${({ appearance }) =>
    appearance.header
      ? `

        color: ${appearance.header.accentColor}
       
      `
      : `
       
        color: 'black';
      `};
  @media screen and (max-width: 414px) {
    margin-left: 1px;
  }
`;

const Desc = styled.p`
  color: grey;
  font-size: 15px;
  margin-left: 40px;
  @media screen and (max-width: 414px) {
    margin-left: 1px;
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputRow = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;

  /* Responsive styling for mobile devices */
  @media screen and (max-width: 414px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoldLabel = styled.label<AppearanceProps>`
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

const TestBoldLabel = styled.label<AppearanceProps>`
  margin: 10px 0;
  font-weight: bold;
  ${({ appearance }) =>
    appearance.component === "label"
      ? `

        color: ${appearance.accentColor}
       
      `
      : `
       
        color: 'black';
      `};
`;
const SmallInput = styled.input`
  width: 170px; /* Adjust the width as needed */
  padding: 9px 11px;
  box-shadow: 0 0 5px rgb(202, 202, 202); /* Box shadow with slight transparency */
  border: 1px solid rgb(202, 202, 202); /* Light grey border */

  /* Responsive styling for mobile devices */
  @media screen and (max-width: 414px) {
    width: 250px; /* Full width on mobile */
  }
`;

const MessageInput = styled.input`
  margin: 10px;
  width: ${({ isMobile }) =>
    isMobile ? "172px" : "367px"}; /* Adjust width based on isMobile prop */
  height: ${({ isMobile }) =>
    isMobile ? "99px" : "130px"}; /* Adjust height based on isMobile prop */
  padding: 8px 10px;
  box-shadow: 0 0 8px rgb(202, 202, 202); /* Box shadow with slightly more visibility */
  border: 1px solid rgb(202, 202, 202); /* Light grey border */

  /* Responsive styling for mobile devices */
  @media screen and (max-width: 414px) {
    width: 250px; /* Full width on mobile */
  }
`;

const FileBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const FileInput = styled.input`
  display: none; /* Hide the default file input */
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 20px 12px;
  border: 2px dashed #ccc;
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 20px;
  margin-bottom: 8px;
  padding: 13px 20px;
  color: white;
  background-color: rgb(0, 41, 255);
  border: none;
  border-radius: 10px;
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

const Span = styled.span`
  color: rgb(37, 57, 190);
`;



const DynamicField = ({ label, placeholder, type, required, appearance, name }) => {
  return (
    <InputGroup>
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
    </InputGroup>
  );
};

const SimpleForm = () => {
  const { newField, appearance, getForm, setFormLink, isDesktopIconVisible, formElements } =
    useContext(FieldContext);
  const contextValue = { newField, appearance };

  const [htmlFormId, setHtmlFormId] = useState("");
  const [finalForm, setfinalForm] = useState("");

  const [isMobileWidth, setIsMobileWidth] = useState(false);

  const baseUrl = import.meta.env.VITE_baseUrl;


  useEffect(() => {
    const fetchData = async () => {
      if (getForm) {
        const { htmlString, styles } = GenerateHTMLString(
          SimpleForm,
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
    // Update isMobileWidth based on isDesktopIconVisible when the component mounts
    if (isDesktopIconVisible) {
      setIsMobileWidth(true);
    } else {
      setIsMobileWidth(false);
    }
  }, [isDesktopIconVisible]); // Watch for changes in isDesktopIconVisible

  // use below function i want to caputre values

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const data = {};
  //   formData.forEach((value, key) => {
  //     data[key] = value;
  //   });
  //   console.log(data);
  // };


  //the appearnce prop used below in container is used to point the styled component prop to toogl
  return (
    <>
      <TopLevelWrapper isMobile={isMobileWidth}>
        <Container appearance={appearance} isMobile={isMobileWidth}>
          <Wrapper>
            <FormBox id="myform">
              <Title appearance={appearance}>
                {formElements?.header?.isVisible
                  ? formElements.header.text
                  : "Get in Touch"}
              </Title>
              <Desc>Leave your message and we'll get back to you shortly</Desc>

              <InputRow>
                <InputGroup>
                  <BoldLabel htmlFor="firstName" appearance={appearance}>
                    First Name <RedAsterisk>*</RedAsterisk>
                  </BoldLabel>
                  <SmallInput type="text" name="firstName" placeholder="John" />
                </InputGroup>
                <InputGroup>
                  <BoldLabel htmlFor="lastName" appearance={appearance}>
                    Last Name<RedAsterisk>*</RedAsterisk>
                  </BoldLabel>
                  <SmallInput type="text" name="lastName" placeholder="Doe" />
                </InputGroup>
              </InputRow>

              <InputRow>
                <InputGroup>
                  <BoldLabel htmlFor="email" appearance={appearance}>
                    Email<RedAsterisk>*</RedAsterisk>
                  </BoldLabel>
                  <SmallInput
                    type="email"
                    name="email"
                    placeholder="user@domain.com"
                  />
                </InputGroup>
                <InputGroup>
                  <BoldLabel htmlFor="phone" appearance={appearance}>
                    Phone<RedAsterisk>*</RedAsterisk>
                  </BoldLabel>
                  <SmallInput
                    type="tel"
                    name="phone"
                    placeholder="+1-999-999-9999"
                  />
                </InputGroup>
              </InputRow>

              <InputRow>
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
              </InputRow>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <InputGroup>
                  <BoldLabel
                    style={{ marginLeft: "16px" }}
                    htmlFor="message"
                    appearance={appearance}
                  >
                    Message<RedAsterisk>*</RedAsterisk>
                  </BoldLabel>
                  <MessageInput
                    isMobile={isMobileWidth}
                    type="text"
                    name="message"
                    placeholder="Your questions or comments"
                  />
                </InputGroup>
              </div>

              <InputRow>
                <InputGroup>
                  <BoldLabel htmlFor="attachments" appearance={appearance}>
                    Attachments
                  </BoldLabel>
                </InputGroup>
              </InputRow>

              <InputGroup>
                <p
                  style={{
                    color: "grey",
                    fontSize: "13px",
                    width: "78%",
                    alignSelf: "center",
                  }}
                >
                  Allowed file types: jpg, jpeg, png, txt, pdf, doc, docx, xls,
                  xlxs, odt, ppt, pptx, html, and less than 100mb
                </p>
              </InputGroup>

              <InputGroup>
                <FileBox>
                  <FileInputLabel>
                    <FileInput type="file" name="attachments" />
                    <Span>Choose File</Span> or Drop Here
                  </FileInputLabel>
                </FileBox>
              </InputGroup>

              <Button appearance={appearance} id="formSubmitBtn" type="submit">
                {formElements?.submitButton?.text
                  ? formElements.submitButton.text
                  : "Submit"}
              </Button>
              <WidgetButton />
            </FormBox>
          </Wrapper>
        </Container>
      </TopLevelWrapper>
    </>
  );
};

export default SimpleForm;
