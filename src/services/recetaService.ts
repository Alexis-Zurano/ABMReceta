import Receta from "../types/receta";

const API_BASE_URL: string = 'https://empresaurios-api.onrender.com/api/v1/productos/receta';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: Receta): Promise<any> => {
  const options: any = { headers: { 'Content-Type': 'application/json' }, method };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreateReceta = async (receta: Receta) => fetchApiCall('POST', undefined, receta);
const fnDeleteReceta = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchReceta = async () => fetchApiCall('GET');
const fnUpdatePReceta = async (receta: Receta) => fetchApiCall('PUT', receta.id, receta);

type DataLayer = {
  create: {
    receta: typeof fnCreateReceta,
  },
  delete: {
    receta: typeof fnDeleteReceta,
  },
  fetch: {
    recetas: typeof fnFetchReceta,
  },
  update: {
    receta: typeof fnUpdatePReceta,
  }
};

const DataLayer: DataLayer = {
    create: {
        receta: fnCreateReceta,
    },
    delete: {
        receta: fnDeleteReceta,
    },
    fetch: {
        recetas: fnFetchReceta,
    },
    update: {
         receta: fnUpdatePReceta,
    }
};  

export default DataLayer;