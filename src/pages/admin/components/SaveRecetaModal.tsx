import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import Receta from '../../../types/receta';

type SaveRecetaModalProps = {
  onHide: () => void;
  onSave: (p: Receta) => void;
  receta: Receta | null;
  show: boolean;
};

const SaveRecetaModal: React.FC<SaveRecetaModalProps> = ({ onSave, onHide, receta, show }) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    const data = Object.fromEntries(new FormData(form));
    onSave({ ...receta!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{receta?.id === 0 ? 'Create' : 'Edit'} Receta </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Nombre receta</Form.Label>
              <Form.Control
                defaultValue={receta?.nombreReceta}
                name="nombreReceta"
                placeholder="Nombre receta"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Descripcion receta</Form.Label>
              <Form.Control
                defaultValue={receta?.descripcionReceta}
                name="descripcionReceta"
                placeholder="Descripcion receta"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Tiempo de preparacion</Form.Label>
              <Form.Control
                defaultValue={receta?.tiempoPreparacion}
                name="tiempoPreparacion"
                placeholder="Tiempo de preparacion"
                required
                type="text"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveRecetaModal;