import { Box, Container, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Authentication = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container sx={{ minHeight: '90vh', marginTop: '50px' }}>
      <Paper sx={{ width: '500px', margin: '0 auto' }}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box>{tab === 0 ? <Login /> : <SignUp />}</Box>
      </Paper>
    </Container>
  );
};

export default Authentication;
