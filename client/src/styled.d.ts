import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary_darker: string;
      secondary: string;
      background: string;
      text: string;
    };
    borderRadius: string;
  }
}
