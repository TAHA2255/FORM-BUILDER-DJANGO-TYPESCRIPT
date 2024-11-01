import React, { createContext, useState } from "react";

type FieldContextType = {
  newField: object[];
  setNewField: (newField: object[]) => void;
  appearance: object[];
  setAppearance: (appearance: object[]) => void;
  getForm: boolean;
  setGetForm: (getForm: boolean) => void;
  formLink: string;
  setFormLink: (formLink: string) => void;
  isDesktopIconVisible: boolean;
  setIsDesktopIconVisible: (isVisible: boolean) => void;
  formElements: {
    header: {
      isVisible: boolean;
      text: string;
    };
    footer: {
      isVisible: boolean;
      text: string;
    };
    submitButton: {
      isVisible: boolean;
      text: string;
    };
  };
  setFormElements: (formElements: typeof initialFormElements) => void;
};

const initialFormElements = {
  header: {
    isVisible: false,
    text: "",
  },
  footer: { 
    isVisible: false,
    text: "",
  },
  submitButton: {
    isVisible: false,
    text: "",
  },
};

const FieldContext = createContext<FieldContextType>({
  newField: [],
  setNewField: () => {},
  appearance: [],
  setAppearance: () => {},
  getForm: false,
  setGetForm: () => {},
  formLink: "",
  setFormLink: () => {},
  isDesktopIconVisible: false,
  setIsDesktopIconVisible: () => {},
  formElements: initialFormElements,
  setFormElements: () => {},
});

const FieldProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [newField, setNewField] = useState<object[]>([]);
  const [appearance, setAppearance] = useState<object[]>([]);
  const [getForm, setGetForm] = useState<boolean>(false);
  const [formLink, setFormLink] = useState<string>("");
  const [isDesktopIconVisible, setIsDesktopIconVisible] =
    useState<boolean>(false);
  const [formElements, setFormElements] =
    useState<typeof initialFormElements>(initialFormElements);

  return (
    <FieldContext.Provider
      value={{
        newField,
        setNewField,
        appearance,
        setAppearance,
        getForm,
        setGetForm,
        formLink,
        setFormLink,
        isDesktopIconVisible,
        setIsDesktopIconVisible,
        formElements,
        setFormElements,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};

export { FieldContext, FieldProvider };
