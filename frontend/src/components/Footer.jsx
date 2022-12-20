import { Box, Container, Stack, Typography } from '@mui/material';
import Appstore from '../images/Appstore.png';
import Playstore from '../images/Playstore.png';
import { GitHub, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{ width: '100%', backgroundColor: '#1e2641', color: '#fff' }}
      py={5}
      mt={5}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column" gap={2}>
            <Typography variant="h6">About the store</Typography>

            <Stack direction="column" gap={1}>
              <Typography variant="subtitle2">Home</Typography>
              <Typography variant="subtitle2">About Us</Typography>
              <Typography variant="subtitle2">Contact Us</Typography>
            </Stack>
          </Stack>

          <Stack direction="column" gap={2}>
            <img src={Appstore} alt="Appstore" width="180px" />
            <img src={Playstore} alt="Playstore" width="180px" />
          </Stack>

          <Stack direction="column" textAlign={'center'} gap={2}>
            <Typography variant="h3">E-Commerce</Typography>
            <Typography variant="subtitle1">
              Every Purchase Will Be Made With Pleasure
            </Typography>
          </Stack>

          <Stack direction="column" gap={2}>
            <Typography variant="h6">Get In Touch</Typography>

            <Stack direction="column" gap={2}>
              <Box
                display="flex"
                align="center"
                gap={1}
                style={{ cursor: 'pointer' }}
              >
                <Instagram />
                <Typography>Instagram</Typography>
              </Box>
              <Box
                display="flex"
                align="center"
                gap={1}
                style={{ cursor: 'pointer' }}
              >
                <LinkedIn />
                <Typography>Linked In</Typography>
              </Box>
              <Box
                display="flex"
                align="center"
                gap={1}
                style={{ cursor: 'pointer' }}
              >
                <GitHub />
                <Typography>GitHub</Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
