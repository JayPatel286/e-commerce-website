import {
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../actions/userActions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const ChangePasswordModal = ({ open, setOpen }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const submitUpdate = () => {
    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));

    setOpen(false);
  };

  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [error, alert]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack direction="row">
            <Stack flex={1} gap={1}>
              <Typography variant="subtitle" mb={2}>
                Your new password must:
              </Typography>
              <Typography variant="subtitle2">
                Be at least 6 characters in length
              </Typography>
              <Typography variant="subtitle2">
                Not contain common passwords.
              </Typography>
            </Stack>

            <Stack flex={1.5} gap={2}>
              <Typography variant="h6" mb={2}>
                Change Password
              </Typography>

              <TextField
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                variant="outlined"
                label="Type Current Password"
              />
              <TextField
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                variant="outlined"
                label="Type New Password"
              />
              <TextField
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                label="Confirm New Password"
              />

              <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                onClick={submitUpdate}
              >
                Change Password
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChangePasswordModal;
