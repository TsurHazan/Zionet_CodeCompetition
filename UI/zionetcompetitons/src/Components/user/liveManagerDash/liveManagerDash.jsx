import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Tab, Tabs, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { useRecoilState } from "recoil";
import { bgMode } from "../../../bgModeContext";
import {
  getCompetitionTask,
  getSubmittedTask,
  getUserCompetitionManagement,
  updateStatusCompetition,
} from "../../../Middlewares/competitions/competitions";
import { GetAllTeamsInCompetition } from "../../../Middlewares/teams/teams";
import { submitTaskSucceeded } from "../../../Pages/editCompetition/taskContext";
import { PopSubmittesTask } from "../popSubmittesTask/popSubmittesTask";
import { TeamsScoreComponent } from "../teamsScoreComponent/teamsScoreComponent";

export const LiveManagerDash = () => {
  const { id } = useParams();
  const { user } = useAuth0();
  const [competition, setCompetition] = useState({});
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [taskSubmitted, setTaskSubmitted] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [enterPoint, setenterPoint] = useState({});
  const [submitTaskSuccess, setSubmitTaskSuccess] =
    useRecoilState(submitTaskSucceeded);

  const { bgState } = useContext(bgMode);
  const theme = useTheme();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const EndCopmetition = async () => {
    await updateStatusCompetition(user.sub, id, "Finished");
    window.location.href = "/Management";
  };

  const getAllCompetitionDetailsFromDB = async () => {
    const ans = await getUserCompetitionManagement(user.sub, id);
    setCompetition(ans.data);
    let nowDate = new Date();
    let competitionDate = new Date(ans.data.end);
    const timeDiff = competitionDate - nowDate;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const timeLeft = {
      hours: hours,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
    if (timeLeft.hours <= 0) {
      setTimeLeft(`${timeLeft.minutes}:${timeLeft.seconds}`);
      if (timeLeft.minutes <= 5) {
        //Last 5 minutes
        if (timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
          setTimeLeft("TIME OVER");
        }
      }
    } else {
      setTimeLeft(`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`);
    }
  };
  const getCompettitionTeams = async () => {
    const allteam = await GetAllTeamsInCompetition(user.sub, id);
    const data = Object.values(allteam.data);
    setTeamsInfo(data);
    console.log(data);
  };
  const getAllCompettitionsTask = async () => {
    const allteam = await getCompetitionTask(user.sub, id);
    const data = Object.values(allteam.data);
    setAllTasks(data);
  };
  const getAllSubmittedTask = async () => {
    const allTask = await getSubmittedTask(user.sub, id);
    const data = Object.values(allTask.data);
    setTaskSubmitted(data);
    if (data.length > 0) {
      setValue(0);
    }
  };
  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionDetailsFromDB();
      await getCompettitionTeams();
      await getAllCompettitionsTask();
      await getAllSubmittedTask();
    };
    initUseEffect();
  }, [submitTaskSuccess]);
  //enterPoint TO useEffect ??

  return (
    <div className="liveManagerDash">
      <h4>Live Manager DASH</h4>
      <h2>{competition.name}</h2>
      <p>Status: {competition.status}</p>
      <p>Hash Code is: {competition.hashcode}</p>
      <p>Time Left: {timeLeft}</p>

      <div>
        <Box
          className={`systemDash tasksDash ${bgState}`}
          sx={{
            bgcolor: "background.paper",
            width: 1300,
            position: "relative",
            minHeight: 600,
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
              <Tab label="Submitted Task" {...a11yProps(0)} />
              <Tab label="Teams score" {...a11yProps(1)} />
              <Tab label="Teams dashboard" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChange}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {/* Submitted Task Table*/}
              <div className="submittedTaskTable">
                <table>
                  <thead>
                    <tr>
                      <th>Team Name</th>
                      <th>Task Name</th>
                      <th>Enter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskSubmitted.map((task) => {
                      let teamObj = teamsInfo.find((oneTeam) => {
                        return oneTeam.id === task.teamID;
                      });
                      let originalTask = allTasks.find((oneTask) => {
                        return oneTask.id === task.taskID;
                      });
                      return (
                        <tr key={task.id}>
                          <td>{teamObj.Name}</td>
                          <td>{originalTask.name}</td>
                          <td>
                            <PopSubmittesTask
                              originalTask={originalTask}
                              submittedTask={task}
                            ></PopSubmittesTask>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
              //onClick={handleChange}
            >
              <TeamsScoreComponent />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              dir={theme.direction}
              //onClick={handleChange}
            >
              <div className="teamDashboardTable">
                <table>
                  <thead>
                    <tr>
                      <th>TEAM NAME</th>
                      <th>TEAM DASHBOARD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamsInfo.map((team) => {
                      let ref = `/LiveCompetitionDashboard/${id}/${team.id}`;
                      return (
                        <tr key={team.id}>
                          <td>{team.Name}</td>
                          <td>
                            <a href={ref} target="_blank">
                              <button className="btn btn-primary">GO</button>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </div>

      <div>
        <button onClick={EndCopmetition}>Finish</button>
      </div>
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

TabPanel.prototype = {
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
