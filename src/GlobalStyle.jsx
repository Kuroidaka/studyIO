import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    /* @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap'); */
    :root {
        --primary-color: #1A1A22;
        --second-color: #596bc4;
        --selected-color: #5F6399;
        --third-color: #3E4165;
        --background-color: #27283a;
        --white-text: #ffff;
        --black-text: #1e1e1e;
        --text-color: #ffff;
    }
    
    *, *:before, *:after {
        -webkit-box-sizing: border-box!important;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 0;
        margin: 0;

        @media screen and (min-width: 769px) {
            font-size: 1.3rem;          
        }
        @media screen and (max-width: 768px) {
            font-size: 1.6rem;
        }
    }
    html {
        font-size: 80.5%;
        width: 100%;
        line-height: 1.5;
        letter-spacing: .01rem;
        overflow: hidden;
        height: -webkit-fill-available;
        
    }
    body {
        ::-webkit-scrollbar{
            width: 0px;
        }
        color: #626262;
        text-rendering: optimizeSpeed;
        background-color: #292A38;
        font-family: Montserrat,Helvetica,Arial,sans-serif;
        font-weight: 400;
        min-height: -webkit-fill-available;

    }
    a {
        color: var(--text-color);
        text-decoration: none;
    }

    .select-none {
        -webkit-user-select: none!important;
        -moz-user-select: none!important;
        -ms-user-select: none!important;
        user-select: none!important;
    }

    .text-center {
        text-align: center!important;
    }
    
    .text-dark {
        color: rgba(30,30,30,1)!important;
    }

    .text-white {
        color: var(--white-text)!important;
        color: rgba(255,255,255,1)!important;
    }

    .line-through {
        text-decoration: line-through!important;
    }

    @-moz-document url-prefix() {
        .wrap-text {
            white-space: -moz-pre-wrap;
        }
    }

`

export default GlobalStyles;