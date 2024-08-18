/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@mui/material';

// Define styled components
const FooterContainer = styled.div`
  background-color: #1976d2;
  padding: 20px 0;
  width: 100%;
  position: relative;
  bottom: 0;
  color: #fff;
`;

const FooterText = styled.div`
  text-align: center;
  margin: 0;
  font-size: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterText>
          Created and Maintained by Ajay Kumar
        </FooterText>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
