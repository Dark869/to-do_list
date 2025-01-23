export const routesNotFound = async (req, res) => {
    res.status(404).send({ message: 'Ruta no encontrada' });
};

