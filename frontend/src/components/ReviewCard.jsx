import { Avatar, Paper, Rating, Stack, Typography } from '@mui/material';

const ReviewCard = ({ review }) => {
  return (
    <Paper
      sx={{
        width: '250px',
        padding: '20px',
      }}
      elevation={2}
    >
      <Stack alignItems="center">
        <Avatar
          src={review.user && review.user.avatar.url}
          alt="user"
          sx={{
            width: 60,
            height: 60,
          }}
        ></Avatar>
        <Typography variant="h6" mt={2}>
          {review.name}
        </Typography>

        <Rating value={review.rating} readOnly />

        <Typography variant="subtitle2" mt={1}>
          {review.comment}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ReviewCard;
