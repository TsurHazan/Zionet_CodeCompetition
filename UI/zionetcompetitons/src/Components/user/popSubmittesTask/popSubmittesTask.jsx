import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { confirmSubmittedTask } from "../../../Middlewares/competitions/competitions";
import { submitTaskSucceeded } from "../../../Pages/editCompetition/taskContext";

export const PopSubmittesTask = ({ originalTask, submittedTask }) => {
  const [submitTaskSuccess, setSubmitTaskSuccess] =
    useRecoilState(submitTaskSucceeded);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSubmitTaskSuccess(!submitTaskSuccess);
  };
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const { user } = useAuth0();

  const isSubmitBonus = submittedTask.bonus === true ? "YES" : "NO";
  const maxPoint =
    isSubmitBonus === "YES"
      ? parseInt(originalTask.points) + parseInt(originalTask.bonusPoints)
      : parseInt(originalTask.points);

  const [pointsGiven, setpointsGiven] = useState(maxPoint);

  const handleUpdatePoint = (event) => {
    setpointsGiven(event.target.value);
  };
  const handleSaveChange = async () => {
    let response = await confirmSubmittedTask(
      user.sub,
      id,
      pointsGiven,
      submittedTask
    );
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Check Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{originalTask.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <a
              href={"http://" + submittedTask.gitRepo}
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-primary">Open Repository</button>
            </a>
            <table>
              <tbody>
                <tr>
                  <td>Task Name:</td>
                  <td>{originalTask.name}</td>
                </tr>
                <tr>
                  <td>Task Ctegory:</td>
                  <td>{originalTask.categoryID}</td>
                </tr>
                <tr>
                  <td>Time:</td>
                  <td>{originalTask.timeframe} minutes</td>
                </tr>
                <tr>
                  <td>Bonus Time:</td>
                  <td>{originalTask.bonusTime} minutes</td>
                </tr>
                <tr>
                  <td>Start Time:</td>
                  <td>{submittedTask.startTime.substring(11, 16)}</td>
                </tr>
                <tr>
                  <td>End Time:</td>
                  <td>{submittedTask.endTime.substring(11, 16)}</td>
                </tr>
                <tr>
                  <td>Submit Time:</td>
                  <td>{submittedTask.submitTime.substring(11, 16)}</td>
                </tr>
              </tbody>
            </table>
            <textarea
              name="description"
              id="description"
              cols="40"
              rows="3"
              value={originalTask.description}
              readOnly
            ></textarea>
            <table>
              <tbody>
                <tr>
                  <td>Point:</td>
                  <td>{originalTask.points}</td>
                </tr>
                <tr>
                  <td>Bonus Point:</td>
                  <td>{originalTask.bonusPoints}</td>
                </tr>
                <tr>
                  <td>Team make bonus?</td>
                  <td>{isSubmitBonus}</td>
                </tr>
              </tbody>
            </table>
            <input
              defaultValue={pointsGiven}
              max={maxPoint}
              id="toPoint"
              type="number"
              onChange={handleUpdatePoint}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
