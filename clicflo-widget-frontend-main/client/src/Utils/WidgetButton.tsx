import styled from "styled-components";
// import redCross from "../assets/redCross.png";
// import meter from "../assets/meter.png";
import { useState } from "react";


const FreeWidget = styled.div`

  font-size: 11px;
  width: max-content;
  border-radius: 10px;
  background-color: #ebebeb;

  padding: 5px;
  display: flex;
  align-items: center;
  align-self: center;
  margin-top: 9px;
  margin-bottom: 13px;
  position: relative;
`;
const MeterImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CrossImage = styled.img`
  width: 18px;
  position: absolute;
  top: -10px;
  right: -4px;
  cursor: pointer;
`;
const WidgetButton = () => {

      const [redCrossToggle, setredCrossToggle] = useState(true);

  return (
    <div style={{ alignSelf: "center" }}>
      {redCrossToggle && (
        <FreeWidget>
          <MeterImg src="https://i.ibb.co/K61V86G/meter.png" />
          <p style={{ color: "#838383;" }}>Free Contact Form Widget</p>
          <CrossImage
            src="https://i.ibb.co/P5yfmQH/redCross.png"
            onClick={() => setredCrossToggle(false)}
          />
        </FreeWidget>
      )}
    </div>
  );
};

export default WidgetButton;
