import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const PopSubmittesTask = ({ originalTask, submittedTask }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    alert(`${pointsGiven} Points`);
    //handleClose();
  };

  //console.log("originalTask", originalTask);
  //console.log("submittedTask", submittedTask);
  console.log("pointsGiven", pointsGiven);

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
            <p>
              <a
                href={"http://" + submittedTask.gitRepo}
                target="_blank"
                //????? rel="noreferrer"
                rel="noreferrer"
              >
                Open Repository
              </a>
            </p>
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
                  <td>{submittedTask.startTime.substring(11, 19)}</td>
                </tr>
                <tr>
                  <td>End Time:</td>
                  <td>{submittedTask.endTime.substring(11, 19)}</td>
                </tr>
                <tr>
                  <td>Submit Time:</td>
                  <td>{submittedTask.submitTime.substring(11, 19)}</td>
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
