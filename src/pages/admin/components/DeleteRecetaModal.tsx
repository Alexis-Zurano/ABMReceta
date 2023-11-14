import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

import Receta from '../../../types/receta';

type DeleteRecetaModalProps = {
  onDelete: () => void;
  onHide: () => void;
  receta: Receta | null;
  show: boolean;
};


const DeleteRecetaModal: React.FC<DeleteRecetaModalProps> = ({ onDelete, onHide, receta, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Eliminar Receta</Modal.Title>
    </Modal.Header>
    <Modal.Body>Está seguro que quiere eliminar la siguiente receta: <strong>{receta?.nombreReceta}</strong>?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cerrar
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Eliminar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteRecetaModal;