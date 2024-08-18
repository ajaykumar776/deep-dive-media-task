import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Report = () => {
  const handleGenerateReport = () => {
    window.location.href = 'http://localhost/deep_dive/generate_report_app/generate_report.php';
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Report Page
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to the Report page. This feature allows you to generate a detailed report of all tasks in the system. The report generation is handled by a Core PHP script integrated with your Laravel application.
      </Typography>
      <Typography variant="body1" paragraph>
        To generate the report, click the "Generate Task Report" button below. This will trigger a request to a Core PHP script located at <code>http://localhost/deep_dive/generate_report_app/generate_report.php</code>. This script is configured to connect to the database as defined in the <code>config.php</code> file located in the <code>root-folder/generate_report_app/config.php</code>. Please ensure that the database configuration is correctly set up for successful report generation.
      </Typography>
      <Typography variant="body1" paragraph>
        If you need to cancel the report generation or return to the previous page, click the "Cancel" button. This will redirect you to the homepage or any other page as specified.
      </Typography>
      <Box mt={2} sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateReport}
        >
          Generate Task Report
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default Report;
