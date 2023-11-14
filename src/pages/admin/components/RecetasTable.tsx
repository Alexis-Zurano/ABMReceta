import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import Receta from "../../../types/receta";
import DataLayer from '../../../services/recetaService';

const DeleteRecetaModal = React.lazy(() => import('./DeleteRecetaModal'));
const SaveRecetaModal = React.lazy(() => import('./SaveRecetaModal'));

type RecetasTableProps = {
  recetas: Receta[];
};

const emptyReceta: Receta = {
    id: 0,
    nombreReceta: '',
    descripcionReceta: '',
    tiempoPreparacion: 0
};

const RecetasTable: React.FC<RecetasTableProps> = ({ recetas }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedRecetas, setListedRecetas] = React.useState<Receta[]>(recetas);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedReceta, setSelectedReceta] = React.useState<Receta | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedReceta) {
      setShowDeleteModal(false);
      setLoading(true);
      DataLayer.delete.receta(selectedReceta.id!)
        .then(() => setListedRecetas((prevState: Receta[]) => prevState.filter((item: Receta) => item.id !== selectedReceta.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedReceta, setShowDeleteModal, setListedRecetas, setLoading]);
  const onSave = React.useCallback((p: Receta) => {
    if (selectedReceta) {
      setShowSaveModal(false);
      setLoading(true);
      if (p.id) {
        DataLayer.update.receta(p)
          .then((editedReceta: Receta) => setListedRecetas((prevState: Receta[]) => prevState.map((item: Receta) => item.id === editedReceta.id ? editedReceta : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete p.id;

        DataLayer.create.receta(p)
          .then((createdReceta: Receta) => {
            setListedRecetas((prevState: Receta[]) => [...prevState, createdReceta]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedReceta, setShowSaveModal, setListedRecetas, setLoading]);
  const onShowDeleteModal = React.useCallback((p: Receta) => {
    setSelectedReceta(p);
    setShowDeleteModal(true);
  }, [setSelectedReceta, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((p?: Receta) => {
    setSelectedReceta(p ?? emptyReceta);
    setShowSaveModal(true);
  }, [setSelectedReceta, setShowSaveModal])
  
  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
              <Button onClick={() => onShowSaveModal()} style={{ float: 'left',  marginTop: '70px', marginBottom: '10px' }} variant="primary">Crear Receta</Button>
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre receta</th>
                    <th>Descripcion receta</th>
                    <th>Tiempo de preparacion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedRecetas.map((p: Receta) => (
                      <tr key={p.id}>
                        <td width='2%'>{p.id}</td>
                        <td width='25%'>{p.nombreReceta}</td>
                        <td width='55%'>{p.descripcionReceta}</td>
                        <td width='3%'>{p.tiempoPreparacion}</td>
                        <td width='10%'>
                          <Button onClick={() => onShowSaveModal(p)} variant="link" className="table-btn-editar">Editar</Button>
                          <Button onClick={() => onShowDeleteModal(p)} variant="link" className="table-btn-eliminar">Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }
      <DeleteRecetaModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        receta={selectedReceta}
        show={showDeleteModal}
      />
      <SaveRecetaModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        receta={selectedReceta}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default RecetasTable