import { List, ListItem, Typography } from "@mui/material"

const Comments = ({ comments }) => {
  return (
    <List
      sx={{ justifyContent: "center", textAlign: "center", padding: "50px" }}
    >
      <Typography variant="h5"> Comments </Typography>
      {comments.map((comment, index) => {
        return (
          <ListItem key={`comment-${index}`}>
            <Typography> - {comment}</Typography>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Comments
