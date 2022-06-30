
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
  VideoStable
} from "@mui/icons-material";
import { ListSubheader, Toolbar } from "@mui/material";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";

//MuiListItem-root MuiListItem-gutters Mui-selected css-13c0w3b-MuiListItem-root


export default function Sidebar(props) {
    return (
        <Drawer
            sx={{
                width: "250px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "250px",
                    boxSizing: "border-box"
                }
            }}
            anchor="left"
            variant={props.mobile?"temporary":"permanent"}
            open={props.opened}
            onClose={()=>{props.toggleLeftBar(false)}}
        >
            <Toolbar
                style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: 0,
                    marginBottom: 0
                }}
            >
                <img src={Brand} height={40} />
            </Toolbar>

            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    MENU
                </ListSubheader>
            }>
                {["Home", "Discover", "History", "Watchlist"].map((text, index) => (
                    <ListItem key={text} disablePadding selected={index==props.tab} sx={{
                        '& .MuiListItem-root.MuiListItem-gutters.Mui-selected':{
                            borderRight:'4px solid red'
                        }
                        
                    }}
                    onClick={()=>{props.setTab(index)}}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                {index == 0 && <HomeRounded />}
                                {index == 1 && <Explore />}
                                {index == 2 && <AccessTimeFilled />}
                                {index == 3 && <Favorite />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    CATEGORY
                </ListSubheader>
            }>
                {["Movie", "TV Shows", "Anime"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index == 0 && <Movie />}
                                {index == 1 && <VideoLibrary />}
                                {index == 2 && <VideoStable />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}