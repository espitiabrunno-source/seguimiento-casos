// Cargar la base de datos
async function cargarBaseDatos() {
    const respuesta = await fetch('asuntos_db.json');
    return await respuesta.json();
}

// Función para evaluar coincidencias Verbatim
function evaluarRespuestasUsuario(textoUsuario, baseDatos) {
    // Normalizar texto del usuario (quitar tildes y convertir a minúsculas)
    const textoLimpio = textoUsuario
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // Filtrar asuntos que coincidan exactamente con los términos verbatim
    const asuntosAplicables = baseDatos.filter(item => {
        return item.terminos_verbatim.some(termino => {
            const terminoLimpio = termino
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            
            return textoLimpio.includes(terminoLimpio);
        });
    });

    return asuntosAplicables;
}
