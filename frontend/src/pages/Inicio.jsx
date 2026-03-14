import Hero from '../components/Hero';
import Servicios from '../components/Servicios';
import Proyectosdes from '../components/Proyectosdes';
import Contacto from '../components/Contacto';



function Inicio() {
    return (
        <main>
            <Hero />
            <Servicios />
            <Proyectosdes />
            <Contacto />
        </main>
    );
}

export default Inicio;