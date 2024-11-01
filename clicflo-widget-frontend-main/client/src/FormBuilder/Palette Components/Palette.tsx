import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FieldContext } from "../../Helpers/FieldContext";

import back from "../../Constants/BuildIcons/back.png";

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

const AddFieldButton = styled.button`
  width: 70%;
  bottom: 20px;
  position: absolute;
  margin-top: 10px;
  color: white;
  padding: 10px 12px;
  border-radius: 5px;
  background-color: rgb(68, 111, 143);
  border: none;

  font-size: 12px;
  cursor: pointer;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// const InputField = styled.input`
//   padding: 3px 5px;
//   border-radius: 5px;
//   border: none;
//   outline: none;
//   width: 100%;
//   margin-bottom: 4px;
//   font-size: 18px;
//   background-color: rgb(41, 41, 41);
//   color: white;
//   &::placeholder {
//     color: white;
//     font-weight: bold;
//     font-size: 14px;
//   }
//   &:focus::placeholder {
//     color: transparent;
//   }
// `;
const MoreFields = styled.div`
  padding: 10px 2px;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
  font-size: 12px;
  width: 95%;
  margin-bottom: 4px;
  margin-left: px;
  background-color: rgb(41, 41, 41);
  color: white;
  &:hover {
    color: rgb(68, 111, 143);
  }
`;

const Label = styled.label`
  font-size: 11px;
  color: #afafaf;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 5px;
`;

const ThemebtnBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

interface ThemeButtonProps {
  active: boolean;
}

const ThemeButton = styled.button<ThemeButtonProps>`
  border: none;
  cursor: pointer;
  padding: 5px 29px;
  color: #fff;
  background-color: #333;
  border-radius: 10px;
  ${({ active }) =>
    active && `background-color: rgb(68, 111, 145);   color: #dad9d9;`}
`;

const ColorInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ColorInput = styled.div`
  margin: 5px;
`;

interface ColorProps {
  isSelected: boolean;
}

const StyledColorCircle = styled.div<ColorProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  border: ${({ isSelected }) => (isSelected ? "2px solid black" : "none")};
  transform: ${({ isSelected }) => (isSelected ? "scale(1.4)" : "none")};
  cursor: pointer;
`;

const ColorCircle = ({ color, isSelected, onClick }) => {
  return (
    <StyledColorCircle
      color={color}
      isSelected={isSelected}
      onClick={onClick} // Use the onClick prop directly
    />
  );
};

const colors = [
  "#FF69B4",
  "#33CC33",
  "#0066CC",
  "#CC0099",
  "#99CC00",
  "#6699CC",
  "#3366CC",
  "#CC3366",
  "#6633CC",
  "#0099CC",
  "#FFC080",
  "#808000",
];

const getColor = (index: number) => colors[index % colors.length];

interface PaintIconProps {
  onClick: () => void;
}

const PaintIcon = ({ onClick }: PaintIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      cursor="pointer"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        fill="currentColor"
        d="M12.2,15.5L12,15.5L12,18H11V21H13V18H12.8L12.8,15.5M18,4V3H6V4H18M18,9H6V10H18V9Z"
      />
    </svg>
  );
};

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

const Palette = () => {
  const { setAppearance, setGetForm, getForm } = useContext(FieldContext);

  const [activeTheme, setActiveTheme] = useState("");
  const [selected, setSelected] = useState<number>(() => 0); // Initialize with a function that returns 0
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // default color
  const [showInput, setShowInput] = useState(false);

  //This state is used to capture the component in which we have to change the accent color;
  const [selectedElement, setSelectedElement] = useState("");

  //This state is to capture the color and the theme version
  const [themeSettings, setThemeSettings] = useState({}); // new state object

  const handleBackClick = () => {
    window.location.reload(); // This will reload the page
  };

  console.log(themeSettings);

  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      theme: activeTheme,
    }));

    setAppearance(themeSettings);
  };

  const handleAccentColorChange = (color) => {
    setSelectedColor(color);
    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      accentColor: color,
    }));
  };

  const handleComponentToStyle = (component) => {
    setSelectedElement(component);

    setThemeSettings((prevSettings) => ({
      ...prevSettings,
      [component]: {
        ...prevSettings[component],

        accentColor: selectedColor, // Initial accent color
      },
    }));

    console.log(themeSettings);
    setAppearance(themeSettings);
  };

  useEffect(() => {
    setAppearance(themeSettings);
  }, [themeSettings]);

  return (
    <Container>
      <Back onClick={handleBackClick} src={back} />
      <Title>Appearance</Title>
      <FieldsBox>
        {/* <Field>
          <Label>Color Theme</Label>
          <ThemebtnBox>
            <ThemeButton
              active={activeTheme === "Light"}
              onClick={() => handleThemeChange("Light")}
            >
              Light
            </ThemeButton>
            <ThemeButton
              active={activeTheme === "Dark"}
              onClick={() => handleThemeChange("Dark")}
            >
              Dark
            </ThemeButton>
          </ThemebtnBox>
        </Field> */}
        <Field>
          <Label>Accent Color</Label>

          <ColorInputWrapper>
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <ColorInput key={index} onClick={() => setSelected(index)}>
                  <ColorCircle
                    color={getColor(index)}
                    isSelected={index === selected}
                    onClick={() => handleAccentColorChange(getColor(index))} // Handle color change on click
                  />
                </ColorInput>
              ))}
            <ColorInput key={13}>
              {showInput ? (
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleAccentColorChange(e.target.value)}
                />
              ) : (
                <PaintIcon onClick={() => setShowInput(true)} />
              )}
            </ColorInput>
          </ColorInputWrapper>
        </Field>
        {/* <Field>
          <InputField type="text" placeholder="First Name" />
        </Field> */}
        <MoreFields
          onClick={() => {
            handleComponentToStyle("label");
          }}
        >
          Label
        </MoreFields>
        <MoreFields onClick={() => handleComponentToStyle("background")}>
          Background
        </MoreFields>
        <MoreFields onClick={() => handleComponentToStyle("header")}>
          Header
        </MoreFields>
        {/* <MoreFields onClick={() => handleComponentToStyle("field")}>
          Form Fields
        </MoreFields> */}
        <MoreFields onClick={() => handleComponentToStyle("submit")}>
          Submit Button
        </MoreFields>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <AddFieldButton>Add To Website For Free</AddFieldButton>
        </div>
      </FieldsBox>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <GetFormButton onClick={() => setGetForm(!getForm)}>
          Get Form
        </GetFormButton>
      </div>
    </Container>
  );
};

export default Palette;
