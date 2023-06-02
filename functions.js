import { Colors } from "./styles/Colors";

export const colorHandler = (color) => {
    const colorValues = Colors[color];
    if (colorValues) {
      const { primary, secondary, light } = colorValues;
      return { primary, secondary, light };
    }
    return null;
  };