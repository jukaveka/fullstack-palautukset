import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
    >
      <Grid
        container
        spacing={5}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid size={12}>
          <Typography variant="h4"> Blog application </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="subtitle1">
            Welcome to using blog application. This application is for sharing,
            discovering and discussing about various blogs
          </Typography>
        </Grid>
        <Grid size={{ sm: 6, md: 4 }} sx={{}}>
          <Card
            onClick={() => navigate("/blogs")}
            sx={{
              minWidth: 300,
              minHeight: 200,
            }}
          >
            <CardContent>
              <Typography variant="h6"> Blogs</Typography>
            </CardContent>
            <CardContent>
              Check what other users have added to list of blogs
            </CardContent>
            <CardContent>
              <Button onClick={() => navigate("/blogs")}> Explore blogs</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{ sm: 6, md: 4 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            onClick={() => navigate("/blogs/new")}
            sx={{
              minWidth: 300,
              minHeight: 200,
            }}
          >
            <CardContent>
              <Typography variant="h6"> Add blog </Typography>
            </CardContent>
            <CardContent>
              Recommend your own favourite blogs for others
            </CardContent>
            <CardContent>
              <Button onClick={() => navigate("/blogs/new")}>
                Add new blog
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          size={{ sm: 6, md: 4 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            onClick={() => navigate("/users")}
            sx={{
              minWidth: 300,
              minHeight: 200,
            }}
          >
            <CardContent>
              <Typography variant="h6"> Users </Typography>
            </CardContent>
            <CardContent>
              Check different users of application and what they have added
            </CardContent>
            <CardContent>
              <Button onClick={() => navigate("/users")}>View users</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
