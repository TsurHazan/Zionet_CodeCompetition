import { useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { bgMode } from "../../bgModeContext";
import { useAuth0 } from "@auth0/auth0-react";
import { GetCompetition } from "../../Middlewares/users/users";
import { useParams } from "react-router-dom";
import {
  TeamTaskHistoryComponent,
  ParticipantChooseTasks,
} from "../../Components/user/userExports";

export const LiveParticipantDashboard = () => {
  const { user } = useAuth0();
  const theme = useTheme();
  const [liveCompetition, setLiveCompetition] = useState({});
  const [value, setValue] = useState(1);
  const { bgState } = useContext(bgMode);
  const { competitionID, teamID } = useParams();
  const [timeLeft, setTimeLeft] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const GetLiveCompetition = async () => {
    const competitionJSON = await GetCompetition(user.sub, competitionID);
    const competition = competitionJSON.data;
    setLiveCompetition(competition);

    let nowDate = new Date();
    let newDate = new Date(competition.end);
    let ddd = new Date(newDate - nowDate);

    setTimeLeft(ddd.toTimeString().substring(0, 8));
  };
  useEffect(() => {
    GetLiveCompetition();
  }, []);

  return (
    <div className="flex-container-columnn">
      <div className="dashboard-opening-information">
        <h4>Welcome to: </h4>
        <h2>{liveCompetition.name}</h2>
        <div>
          <h6>Competition ends in: {timeLeft}</h6>
          <h6>Good Luck!</h6>
        </div>
      </div>

      <Box
        className={`component-container ${bgState}`}
        sx={{
          bgcolor: "background.paper",
          position: "relative",
          minHeight: 300,
        }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Tasks History" {...a11yProps(0)} />
            <Tab label="Choose Tasks" {...a11yProps(1)} />
            <Tab label="Teams Ranks" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TeamTaskHistoryComponent
              competitionID={competitionID}
              teamID={teamID}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ParticipantChooseTasks
              competitionID={competitionID}
              teamID={teamID}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}
