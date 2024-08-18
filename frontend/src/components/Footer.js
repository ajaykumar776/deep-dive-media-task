import React from 'react';
import { css } from '@emotion/react';
import { Container } from '@mui/material';

const footerStyles = {
  container: css`
    background-color: #1976d2;
    padding: 20px 0; /* Padding for the footer */
    width: 100%;
    position: relative;
    bottom: 0;
    color: #fff; /* White text color */
  `,
  text: css`
    text-align: center;
    margin: 0;
    font-size: 20px; /* Adjust font size if needed */
  `,
};

const Footer = () => {
  return (
    <div css={footerStyles.container}>
      <Container>
        <div css={footerStyles.text}>
         Created and Maintained by Ajaykumar
        </div>
      </Container>
    </div>
  );
};

export default Footer;
