/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Container, Typography, Button, Box } from '@mui/material';

const backgroundImage = 'url("/page1.jpg")'; // Ensure this path is correct and image is in the public directory

const landingPageStyles = {
  container: css`
    background-image: ${backgroundImage};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 100px 20px;
    text-align: center;
    color: #fff;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  heading: css`
    font-size: 3rem;
    color: #fff;
    margin-bottom: 20px;
    z-index: 1;
    font-weight: bold;
  `,
  subheading: css`
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 40px;
    z-index: 1;
    font-weight: 300;
  `,
  button: css`
    margin: 0 10px;
    z-index: 1;
  `,
  primaryButton: css`
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  `,
  secondaryButton: css`
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #5a6268;
    }
  `,
};

const LandingPage = () => {
  const handleGetStarted = () => {
    window.location.href = '/tasks';
  };

  const handleLearnMore = () => {
    window.location.href = '/task';
  };

  return (
    <div css={landingPageStyles.container}>
      <Container>
        <Typography variant="h1" css={landingPageStyles.heading}>
          Welcome to Task Management
        </Typography>
        <Typography variant="h6" css={landingPageStyles.subheading}>
          Manage your tasks efficiently with our intuitive platform.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            css={landingPageStyles.primaryButton}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            css={landingPageStyles.secondaryButton}
            onClick={handleLearnMore}
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
