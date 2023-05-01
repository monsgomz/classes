import { createGlobalStyle } from 'styled-components'


export const GlobalStyles = createGlobalStyle`
:root {

  --background-color: #F4B183;
  --secondary-color:rgba(255, 255, 255, 0.87);
  --dark-color: #707b6f;
  --nav-color: #b5d5c5aa;
  --border-nav:#B5D5C5;
  --color-nav:rgb(29, 83, 31);
  --active-nav: #8a2be2;
  --fav-color:#ff0000;
  --navbar-shadow:#707b6f;

  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: var(--secondary-color);
  background-color: var(--background-color);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

`

export default GlobalStyles;