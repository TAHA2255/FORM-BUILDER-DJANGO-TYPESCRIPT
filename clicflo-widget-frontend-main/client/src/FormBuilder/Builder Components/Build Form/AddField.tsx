import styled from "styled-components";
import toggleOn from "../../../Constants/BuildIcons/toggleOn.png";
import toggleOff from "../../../Constants/BuildIcons/toggleOff.png";
import back from "../../../Constants/BuildIcons/back.png";
import React, { useCallback, useContext, useState } from "react";
import BuildForm from "./BuildForm";
import { FieldContext } from "../../../Helpers/FieldContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  background-color: black;
`;
const FieldsBox2 = styled.div`
  margin-top: 40px;
  width: 80%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: black;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  justify-content: space-between;
  padding: 5px 4px;

  background-color: rgb(41, 41, 41);
  align-items: flex-start;
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

const AddFieldButton = styled.button`
  margin-top: 10px;
  color: rgb(92, 145, 186);
  padding: 2px 10px;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  
`;
const GetFormButton = styled.button`
  margin-top: 10px;
  color: white;
  padding: 8px 19px;
  background-color: green;
  border-radius: 18px;

  border: none;
  outline: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

`;

const Title = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
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
    font-size: 14px; /* Adjust the placeholder font size as needed */
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
    font-size: 14px; /* Adjust the placeholder font size as needed */
  }
`;

const Label = styled.label`
  font-size: 11px;
  color: #afafaf;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const Toggle = styled.img`
  width: 30px;
  margin-right: 5px;
  margin-bottom: 2px;
  cursor: pointer;
`;

const Back = styled.img`
  width: 32px;
  align-self: flex-start;
  margin-left: 40px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out; /* Add transition effect */
  &:hover {
    transform: scale(1.1);
  }
`;

const useDoubleClickSimulation =(onClick) =>{
  const [clickCount, setClickCount] = useState(0);
const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const handleClick = useCallback(() => {
    setClickCount(clickCount + 1);

    if (clickCount === 1) {
      setTimer(
        setTimeout(() => {
          // Perform single click action here
          onClick();
          setClickCount(0); // Reset click count
        }, 300)
      ); // Wait for 300ms for a second click
    } else if (clickCount === 2) {
      clearTimeout(timer); // Clear the timer if a second click occurs
      // Perform double click action here
      onClick();
      setClickCount(0); // Reset click count
    }
  }, [clickCount, onClick, timer]);

  return handleClick;
}



const AddField = () => {

  
  const { setNewField, setGetForm, getForm} = useContext(FieldContext);

  

  const [captureNewFields, setCaptureNewFields] = useState<object>({});

  const [buildCalled, setbuildCalled] = useState(false);

  const [toggles, setToggles] = useState({
    requiredFields: false,
    showLabel: false,
    firstName: false,
  });

  const handleToggle = (field: keyof typeof toggles) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [field]: !prevToggles[field],
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCaptureNewFields((prevFields) => ({ ...prevFields, [name]: value }));
  };
  const handleAddField = useCallback(() => {
    setNewField((prevFields) => [
      ...prevFields,
      { ...captureNewFields, required: toggles.requiredFields },
    ]);
    setCaptureNewFields({});
  }, [setNewField, captureNewFields, toggles.requiredFields]);


  const notify = () => toast.success("Form obtained successfully!");

 const handleGetFormClick = () => {
   setGetForm(!getForm);
   notify()
 };
  return (
    <>
      <ToastContainer
        position="bottom-right" // Position of the toast notifications
        autoClose={5000} // Auto close duration in milliseconds
        hideProgressBar={false} // Show or hide the progress bar
        newestOnTop={false} // Show newest toast notifications on top
        closeOnClick // Close toast on click
        rtl={false} // Right to left layout support
        draggable // Allow dragging the toast notifications
        pauseOnHover // Pause auto close when hovering over the toast
        limit={3} // Limit the number of toast notifications displayed
      />
      {buildCalled ? (
        <BuildForm />
      ) : (
        <>
          {" "}
          <Container>
            <Title>Build Form</Title>

            <Back onClick={() => setbuildCalled(true)} src={back} />

            <FieldsBox>
              <Field>
                <Label>Label</Label>
                <InputField
                  type="text"
                  placeholder="Full Name"
                  style={{ width: "100%" }}
                  name="label"
                  onChange={handleInputChange}
                  min={3}
                />
              </Field>
              <Field>
                <Label>Placeholder</Label>
                <InputField
                  required
                  min={3}
                  type="text"
                  placeholder="First Name"
                  style={{ width: "100%" }}
                  name="placeholder"
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Label>Placeholder</Label>
                <InputField
                  type="text"
                  placeholder="First Name"
                  style={{ width: "100%" }}
                  name="placeholder2"
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <Label>Hint</Label>
                <InputField
                  type="text"
                  style={{ width: "100%", padding: "10px 5px" }}
                  name="hint"
                  onChange={handleInputChange}
                />
              </Field>

              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <AddFieldButton onClick={handleAddField}>
                  Add Field +
                </AddFieldButton>
              </div>
            </FieldsBox>
            <FieldsBox2>
              <Field2 onClick={() => handleToggle("requiredFields")}>
                <InputField2
                  type="text"
                  placeholder="Required Fields"
                  style={{ width: "100%" }}
                  readOnly
                />
                <Toggle src={toggles.requiredFields ? toggleOn : toggleOff} />
              </Field2>
              <Field2 onClick={() => handleToggle("showLabel")}>
                <InputField2
                  type="text"
                  placeholder="Show Label"
                  style={{ width: "100%" }}
                  readOnly
                />{" "}
                <Toggle src={toggles.showLabel ? toggleOn : toggleOff} />
              </Field2>
              <Field2 onClick={() => handleToggle("firstName")}>
                <InputField2
                  type="text"
                  placeholder="First Name"
                  style={{ width: "100%" }}
                  readOnly
                />{" "}
                <Toggle src={toggles.firstName ? toggleOn : toggleOff} />
              </Field2>
            </FieldsBox2>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <GetFormButton onClick={handleGetFormClick}>
                  Get Form
                </GetFormButton>
              </div>
            </div>
          </Container>{" "}
        </>
      )}
    </>
  );
};

export default AddField;
