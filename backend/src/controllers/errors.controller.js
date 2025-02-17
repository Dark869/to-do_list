export const routesNotFound = async (req, res) => {
    res.status(404).send({ success: false, error: 'Ruta no encontrada' });
};

