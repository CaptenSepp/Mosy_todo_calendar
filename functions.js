import { Colors } from "./styles/Colors";

export const colorHandler = (color) => {
    const colorValues = Colors[color];
    if (colorValues) {
      const { primary, secondary, light } = colorValues;
      return { primary, secondary, light };
    }
    return null;
  };

 export const addLastElement = (data) =>{
    const endValue = {id: data.length+1948394,projectId: "addButton"};
    const updatedData = [...data, endValue];
    return updatedData
  };