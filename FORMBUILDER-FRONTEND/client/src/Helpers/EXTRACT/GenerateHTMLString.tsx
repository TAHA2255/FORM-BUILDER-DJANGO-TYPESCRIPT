import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { FieldContext } from "../FieldContext";

export const GenerateHTMLString = (Component, props, contextValue) => {
  const sheet = new ServerStyleSheet();

  // Wrap your component with the necessary context providers
  const wrappedComponent = (
    <FieldContext.Provider value={contextValue}>
      <Component {...props} />
    </FieldContext.Provider>
  );

  const htmlString = ReactDOMServer.renderToString(
    sheet.collectStyles(wrappedComponent)
  );
  const styles = sheet.getStyleTags();



  

  return { htmlString, styles };
};