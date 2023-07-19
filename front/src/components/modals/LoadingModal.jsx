import { Modal, ModalDialog, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className="d-flex justify-content-center  py-2">
          <Spinner animation="border" variant="info" />
        </div>
      </Modal.Body>
    </Modal>
  );
}
