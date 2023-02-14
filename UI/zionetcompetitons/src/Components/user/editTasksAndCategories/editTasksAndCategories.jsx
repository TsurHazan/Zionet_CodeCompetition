import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../../Styles/systemManager.css";
import {
  ShowAllCompetitions,
  CreateCompetition,
} from "../../systemManager/systemManagerExports.js";
import { bgMode } from "../../../bgModeContext.js";
import {
  DeleteOneTask,
  getCategories,
  getCompetitionTask,
  setNewCategory,
} from "../../../Middlewares/competitions/competitions";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { EditTask } from "../editTask/editTask";
import { Autocomplete, TextField } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import { categoriesList } from "../../../Pages/editCompetition/categoriesContext";
import { taskObjToEdit } from "../../../Pages/editCompetition/taskContext";

export const EditTasksAndCategories = () => {
  const theme = useTheme();
  //value of current page in task view
  const [value, setValue] = useState(1);
  //use State of all categories
  const [V, setV] = useState("");
  const { bgState } = useContext(bgMode);
  //Parameter of Copmetition's ID
  const { id } = useParams();
  //Parameter of User's ID
  const { user } = useAuth0();
  //use Context of Categories List
  const { lcategories, setLcategories } = useContext(categoriesList);
  //use Context of Task To send into Editing Page
  const { taskToEdit, settaskToEdit } = useContext(taskObjToEdit);

  const [allTask, setAllTask] = useState([]);
  const [allCategories, setCategories] = useState([]);
  const [newCategory, setnewCategory] = useState();
  const [categoriesOpt, setCategoriesOpt] = useState([]);

  const handlenewCategory = (event) => {
    setnewCategory(event.target.value);
  };
  //handle of index Page of Task Editing
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //Get All Competition Task when moving page after add new Competition
  const handleChangeIndex = (index) => {
    getAllCompetitionTask();
    setValue(index);
  };
  // <---------- Get All Task For This Copmetition -------------->
  const getAllCompetitionTask = async () => {
    const all = await getCompetitionTask(user.sub, id);
    const data = Object.values(all.data);
    setAllTask(data);
  };

  // <---------- Get All Categories -------------->
  const getallCategories = async () => {
    const all = await getCategories();
    const data = Object.values(all.data);
    setCategories(data);
    await setCategoriesOption();
  };
  // <---------- Send New Category -------------->
  const sendNewCategoryToDB = async () => {
    await setNewCategory(newCategory);
    await getallCategories();
    await setCategoriesOption();
  };
  //sending task editing whit handle object value like in DB
  const moveToEditTask = (task) => {
    settaskToEdit({
      id: task.id,
      CompetitionID: task.competitionID,
      CategoryID: task.categoryID,
      Timeframe: task.timeframe,
      points: task.points,
      Description: task.description,
      BonusPoints: task.bonusPoints,
      BonusTime: task.bonusTime,
      name: task.name,
    });
    setValue(0);
  };

  const setCategoriesOption = async () => {
    let category = allCategories;
    let num = 0;
    const AllCat = [];

    for (let i = 0; i < category.length; i++) {
      const element = {
        label: category[i].id,
        id: i,
      };
      AllCat.push(element);
    }

    setCategoriesOpt(AllCat);
    setLcategories(AllCat);
  };

  const deleteTaskFromDB = async (taskID) => {
    await DeleteOneTask(user.sub, id, taskID.toString());
    await getAllCompetitionTask();
  };

  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionTask();
      await getallCategories();
      //Multi Trhed ??
      await setCategoriesOption();
    };
    initUseEffect();
  }, [value]);
  return (
    <>
      <Box
        className={`component-container tasksDash ${bgState}`}
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
            <Tab label="Create new Tasks" {...a11yProps(0)} />
            <Tab label="Tasks" {...a11yProps(1)} />
            <Tab label="Categories" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            onClick={setCategoriesOption}
          >
            <EditTask />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            onClick={setCategoriesOption}
          >
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Points</th>
                  <th>Time</th>
                  <th>BonusTime</th>
                  <th>Bonus Points</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allTask.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>
                        <button
                          onClick={() => {
                            moveToEditTask(
                              allTask.find((c) => {
                                return c.id === task.id;
                              })
                            );
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>{task.name}</td>
                      <td>{task.categoryID}</td>
                      <td>{task.points}</td>
                      <td>{task.timeframe}</td>
                      <td>{task.bonusTime}</td>
                      <td>{task.bonusPoints}</td>
                      <td>{task.description}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteTaskFromDB(task.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            dir={theme.direction}
            onClick={setCategoriesOption}
          >
            <div className="categoryEdit">
              <label htmlFor="newCategory">NEW Category</label>
              <input
                id="newCategory"
                type="text"
                onChange={handlenewCategory}
              />
              {/* TO DO OnClick to send new category */}
              <button onClick={sendNewCategoryToDB}>Add Category</button>
              <br />
              <br />
              <Autocomplete
                forcePopupIcon={true}
                freeSolo={true}
                disablePortal
                value={V}
                onChange={(event, value) => {
                  setV(value.label);
                }}
                id="combo-box-demo"
                options={categoriesOpt}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="ALL CATEGORIES" />
                )}
              />
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
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
