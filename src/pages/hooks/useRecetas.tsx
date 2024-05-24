import * as React from 'react';

import DataLayer from '../../services/recetaService';
import Receta from "../../types/receta";

type UseRecetaState = {
  data: Receta[];
  error: any;
  loading: boolean;
};

const initialState: UseRecetaState = {
  data: [],
  error: null,
  loading: true,
};

const useRecetas = () => {
  // State
  const [state, setState] = React.useState<UseRecetaState>(initialState);

  // Effects
  React.useEffect(function fetchRecetas() {
    DataLayer.fetch.recetas()
      .then((data: Receta[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default useRecetas;

