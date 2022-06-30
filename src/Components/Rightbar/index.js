
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Brand from "./../../brand.png";
import {
    HomeRounded,
    CompassCalibrationRounded,
    AccessTimeFilled,
    Explore,
    Favorite,
    Movie,
    VideoLibrary,
    VideoStable,
    Search,
    Title
} from "@mui/icons-material";
import { Button, InputAdornment, ListSubheader, Rating, Stack, TextField, Toolbar, Typography } from "@mui/material";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "../../Actions";
import { searchByName } from "../../Utils/api";


function HMovieCard(props) {
    return (
        <Stack direction="row" spacing={1}>
            <Box sx={{ width: 70, height: 90, backgroundColor: 'whitesmoke', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(https://image.tmdb.org/t/p/w200${props.poster})` }}>

            </Box>
            <Stack spacing={0}>
                <Typography variant="h6" sx={{ fontSize: 16 }}>{props.title}</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: 14, color: '#a1a1a1' }}>Action, Adventure</Typography>
                <Rating name="read-only" sx={{ marginTop: 1 }} value={props.rating} readOnly />
            </Stack>
        </Stack>
    )
}

export default function RightBar(props) {
    const dispatch = useDispatch()
    const watchlist = useSelector(state => state.watchlist)
    return (
        <Drawer
            sx={{
                width: "350px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "350px",
                    boxSizing: "border-box"
                }
            }}
            variant={"temporary"}
            open={props.opened}
            onClose={() => { props.toggleRightBar(false) }}
            anchor="right"
        >
            <Box sx={{ width: '100%', padding: 2, boxSizing: 'border-box' }}>
                <TextField variant="outlined"
                    placeholder="Search.."
                    onChange={(e) => { console.log(e.currentTarget.value); dispatch(searchByName(e.currentTarget.value, 'movie')) }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth size="small" />
            </Box>

            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Trending this week
                </ListSubheader>
            }>


                <ListItem>
                    <HMovieCard title="Baby driver" rating={4} />
                </ListItem>
                <ListItem>
                    <HMovieCard title="Pulp fiction" rating={5} />
                </ListItem>
                <ListItem>
                    <Button variant="text" color="primary" fullWidth>See more</Button>
                </ListItem>
            </List>

            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    My Watchlist
                </ListSubheader>
            }>
                {watchlist.map(item => <ListItem>
                    <HMovieCard title={item.title} rating={3} poster={item.poster_path} />
                </ListItem>)}

                <ListItem>
                    <Button variant="text" color="primary" fullWidth>See more</Button>
                </ListItem>
            </List>

        </Drawer>
    )
}