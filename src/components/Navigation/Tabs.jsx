import * as React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@mui/material";

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
    handleTypeSelection(
      ["alcoholicDrinks", "nonAlcohol", "rest", "Pfand"][newValue]
    );
  };

  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tab example"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Alkoholische Getränke" {...a11yProps(0)} />
        <Tab label="Alkoholfreie Getränke" {...a11yProps(1)} />
        <Tab label="Rest" {...a11yProps(2)} />
        <Tab label="Pfand" {...a11yProps(3)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        Alkoholische Getränke
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Alkoholfreie Getränke
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Rest
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Pfand
      </CustomTabPanel>
    </Box>
  );
}
