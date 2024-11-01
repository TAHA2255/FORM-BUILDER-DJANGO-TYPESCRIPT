import styled from "styled-components";
import { categories } from "../Constants/BuildIcons";
import BuildForm from "./Builder Components/Build Form/BuildForm";
import { useState } from "react";
import Palette from "./Palette Components/Palette";

const Container = styled.div`
  overflow: hidden;
  display: flex;
  height: auto;
  width: 100%;
  border-radius: 19px;
  background-color: black;

  color: white;
  flex-direction: row; /* Add this to display OptionsBox and BuildBox side by side */
  position: relative;
`;

const OptionsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 3px;

  margin-top: 5px;
  width: 22%;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 2px;
`;

const CategoryIcon = styled.img`
  width: 29px;
  height: 23.25px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const CategoryTitle = styled.p`
  font-size: 12px;
  line-height: 20.57px;
  font-weight: 900;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const BuildBox = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: rgb(20, 20, 20);
  /* Adjust the width to accommodate the BuildBox on the right side */
  padding: 1px;
  /* Add some margin to separate from OptionsBox */
`;

const Builder = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleCategoryClick = (category: number) => {
    setSelectedCategory(category);
    };
    


  return (
    <Container>
      <OptionsBox>
        {categories?.map((item) => (
          <CategoryBox key={item.id}>
            <CategoryIcon
              src={item.image}
              onClick={() => handleCategoryClick(item.id)}
            />
            <CategoryTitle>{item.title}</CategoryTitle>
          </CategoryBox>
        ))}
      </OptionsBox>

      <BuildBox>
        {selectedCategory === 1 ? (
          <BuildForm key={selectedCategory} /> // Render BuildForm component if selectedCategory is 'Build Form'
        ) : selectedCategory === 4 ? (
          <Palette />
        ) : (
          <><h1>Build Box</h1></> // or <h1></h1> if you want to render an empty heading
        )}
      </BuildBox>
    </Container>
  );
};
export default Builder;
