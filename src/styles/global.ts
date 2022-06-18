import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    /* outline: 0; */
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    font-family: sans-serif;
    background: #e4e6ec;
    
  }
  
  :root {
    --button-background-color: #367b92;
    --button-click: #367b92;
    --link-color: #367b92;
    --ion-color-primary-ting: #367b92;
    
    .Nav__nav___2Dx2Y {
      background: #e4e6ec;

    }
  }

  #app {
    display: flex;
    justify-content: center;
  }
`;
