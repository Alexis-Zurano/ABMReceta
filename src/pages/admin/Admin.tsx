import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import useRecetas from "./hooks/useRecetas";

const RecetasTable = React.lazy(() => import('./components/RecetasTable'));

const Admin: React.FC = () => {
  // Utils
  const { data, error, loading } = useRecetas();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return loading
    ? (
      <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
      </div>
    )
    : (
      <React.Suspense fallback={<Spinner animation="border" />}>
        <RecetasTable recetas={data} />
      </React.Suspense>
    )
};

export default Admin;