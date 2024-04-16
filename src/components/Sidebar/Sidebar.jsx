import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icon für Logout

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <img
        className="mx-auto h-12 w-auto"
        src="https://static.wixstatic.com/media/46be4a_6c3f161a74e24760a2be8db1349380ee~mv2.png/v1/fill/w_159,h_159,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_startseite-1.png"
        alt="Jimmys mobile Cocktailbar"
      />
      <List style={{ marginTop: "50px" }}>
        {["Post Eingang", "Storno-Anfrage", "Statistiken"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List style={{ position: "absolute", bottom: 0 }}>
        <ListItem key="Logout" disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex, align-middle, justify-center">
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
