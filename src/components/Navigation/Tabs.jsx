import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TemporaryDrawer from "../Sidebar/Sidebar";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ handleTypeSelection }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        handleTypeSelection("alcoholicDrinks");
        break;
      case 1:
        handleTypeSelection("nonAlcohol");
        break;
      case 2:
        handleTypeSelection("rest");
        break;
      case 3:
        handleTypeSelection("Pfand");
        break;

      default:
        handleTypeSelection("alcoholicDrinks");
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%", // volle Breite verwenden
          borderBottom: 1,
          borderColor: "divider",
          maxWidth: "100%", // Stelle sicher, dass keine maximale Breite eingestellt ist
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Alle Getränke filtern"
          variant="scrollable"
          scrollButtons="auto" // automatische Anzeige der Scroll-Buttons
          allowScrollButtonsMobile
        >
          <Tab
            style={{ color: "white", height: "50px" }}
            label="Alkoholische Getränke"
            {...a11yProps(0)}
          />
          <Tab
            style={{ color: "white", height: "50px" }}
            label="Alkoholfreie Getränke"
            {...a11yProps(1)}
          />
          <Tab
            style={{ color: "white", height: "50px" }}
            label="Rest"
            {...a11yProps(2)}
          />
          <Tab
            style={{ color: "white", height: "50px" }}
            label="Pfand"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel
        style={{ color: "white", height: "50px" }}
        value={value}
        index={0}
      >
        Alkoholische Getränke
      </CustomTabPanel>
      <CustomTabPanel
        style={{ color: "white", height: "50px" }}
        value={value}
        index={1}
      >
        Alkoholfreie Getränke
      </CustomTabPanel>
      <CustomTabPanel
        style={{ color: "white", height: "50px" }}
        value={value}
        index={2}
      >
        Rest
      </CustomTabPanel>
      <CustomTabPanel
        style={{ color: "white", height: "50px" }}
        value={value}
        index={3}
      >
        Pfand
      </CustomTabPanel>
    </>
  );
}
