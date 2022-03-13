
//este modulo foi criado para quando formos acessar o theme pelo styled components ele ter o poder da inferencia de tippos

import "styled-components";
import theme from "./theme";

declare module 'styled-components' {
    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType {}
}