import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({
  show,
  onHide,
  onConfirm,
  mensaje,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar acción</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{mensaje}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}