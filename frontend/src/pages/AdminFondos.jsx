import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminFondos = () => {
    const navigate = useNavigate();
    const [fondos, setFondos] = useState([]);
    const token = localStorage.getItem('token_adiie');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            obtenerFondos();
        }
    }, [token, navigate]);

    const obtenerFondos = async () => {
        try {
            const res = await fetch('https://webadiie-backend.onrender.com/api/fondos_hero');
            const data = await res.json();
            setFondos(data);
        } catch (error) { 
            console.error(error); 
        }
    };

    const abrirWidgetSubida = () => {
        window.cloudinary.openUploadWidget(
            {
                cloudName: 'dtiqi9fim', // Tu nube de Cloudinary
                uploadPreset: 'ml_default',
                sources: ['local', 'url'],
                styles: { palette: { window: '#0B2126', sourceTabIcon: '#D4AF37' } }
            },
            async (error, result) => {
                if (!error && result && result.event === "success") {
                    const url = result.info.secure_url;
                    guardarFondoEnBD(url);
                }
            }
        ).open();
    };

    const guardarFondoEnBD = async (url) => {
        try {
            const res = await fetch('https://webadiie-backend.onrender.com/api/fondos_hero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ url: url, posicion: 'center' })
            });

            if (res.ok) {
                Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Fondo de portada agregado', showConfirmButton: false, timer: 2500 });
                obtenerFondos(); // Recargamos la lista visualmente
            }
        } catch (error) {
            console.error(error);
        }
    };

    const borrarFondo = async (id) => {
        const confirmacion = await Swal.fire({
            title: '¿Eliminar este fondo?',
            text: "Desaparecerá de la portada principal inmediatamente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#0B2126',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                const res = await fetch(`https://webadiie-backend.onrender.com/api/fondos_hero/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    obtenerFondos();
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Fondo eliminado', showConfirmButton: false, timer: 2000 });
                }
            } catch (error) { 
                console.error(error); 
            }
        }
    };

    return (
        <div className="container" style={{ marginTop: '140px', marginBottom: '80px' }}>
            
            {/* ENCABEZADO Y BOTÓN DE SUBIDA */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
                <div className="d-flex align-items-center gap-3">
                    <button onClick={() => navigate('/admin_dashboard')} className="btn btn-outline-dark d-flex align-items-center gap-2 rounded-pill px-3">
                        <ArrowLeft size={18} /> Volver
                    </button>
                    <h2 className="m-0 fw-bold" style={{ color: '#0B2126' }}>Imágenes de Portada</h2>
                </div>
                
                <button onClick={abrirWidgetSubida} className="btn text-white fw-bold d-flex align-items-center gap-2 shadow-sm px-4 py-2" style={{ backgroundColor: '#D4AF37', borderRadius: '8px' }}>
                    <Upload size={20} /> Subir Nueva Foto
                </button>
            </div>

            {/* GRILLA DE FONDOS ACTUALES */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {fondos.map((fondo) => (
                    <div key={fondo._id} className="col">
                        <div className="card border-0 shadow-sm rounded overflow-hidden h-100">
                            <img src={fondo.url} alt="Fondo Hero" className="w-100 object-fit-cover" style={{ height: '220px' }} />
                            <div className="card-body bg-light text-center p-3">
                                <button onClick={() => borrarFondo(fondo._id)} className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center w-100 gap-2">
                                    <Trash2 size={16} /> Eliminar de la portada
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* MENSAJE SI ESTÁ VACÍO */}
                {fondos.length === 0 && (
                    <div className="col-12 text-center text-muted mt-5">
                        <ImageIcon size={48} className="mb-3 opacity-50" />
                        <h4>No hay imágenes en la portada</h4>
                        <p>Sube la primera haciendo clic en el botón dorado.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFondos;