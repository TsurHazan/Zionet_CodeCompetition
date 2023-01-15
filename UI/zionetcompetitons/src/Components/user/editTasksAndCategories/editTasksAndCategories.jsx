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
  getCategories,
  getCompetitionTask,
  setNewCategory,
} from "../../../Middlewares/competitions.js/competitions";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { EditTask } from "../editTask/editTask";
import { Autocomplete, TextField } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import { categoriesList } from "../../../Pages/editCompetition/categoriesContext";

export const EditTasksAndCategories = () => {
  const theme = useTheme();
  const [value, setValue] = useState(1);
  const { bgState } = useContext(bgMode);
  const { id } = useParams();
  const { user } = useAuth0();

  const { lcategories, setLcategories } = useContext(categoriesList);

  const [allTask, setAllTask] = useState([]);
  const [allCategories, setCategories] = useState([]);
  const [newCategory, setnewCategory] = useState();
  const [categoriesOpt, setCategoriesOpt] = useState([]);

  const handlenewCategory = (event) => {
    setnewCategory(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
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
  const moveToEditTask = () => {
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
  useEffect(() => {
    const initUseEffect = async () => {
      await getAllCompetitionTask();
      await getallCategories();
      //Multi Trhed ??
      await setCategoriesOption();
    };
    initUseEffect();
  }, []);

  return (
    <Box
      className={`systemDash ${bgState}`}
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
                      <button onClick={moveToEditTask}>Edit</button>
                    </td>
                    <td>{task.name}</td>
                    <td>{task.categoryID}</td>
                    <td>{task.points}</td>
                    <td>{task.timeframe}</td>
                    <td>{task.bonusTime}</td>
                    <td>{task.bonusPoints}</td>
                    <td>{task.description}</td>
                    <td>
                      <button>Delete</button>
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
            <input id="newCategory" type="text" onChange={handlenewCategory} />
            {/* TO DO OnClick to send new category */}
            <button onClick={sendNewCategoryToDB}>Add Category</button>
            <br />
            <br />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categoriesOpt}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="ALL CATEGORIES" />
              )}
            />
            <br />
            {/* <ul className="categoryList">
              {allCategories.map((category) => {
                return <li key={category.name}>{category.id}</li>;
              })}
            </ul> */}
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
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
