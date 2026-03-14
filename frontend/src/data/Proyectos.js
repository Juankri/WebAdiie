// src/data/proyectos.js

export const baseDeDatosProyectos = [
    {
        id: "quincho-af", // La URL
        tipo: "proyecto",
        titulo: "QUINCHO AF",
        categoria: "Remodelación Exterior",
        descripcion: "Diseño de quincho moderno con piscina, estilo minimalista y acabados en madera...",
        imagenPrincipal: "/img/Proyecto01/QUINCHO_AF/quincho05.webp",
        
        // ¡NUEVO! Un arreglo con todas las fotos de la galería
        galeria: [
            "/img/Proyecto01/QUINCHO_AF/quincho01.webp",
            "/img/Proyecto01/QUINCHO_AF/quincho02.webp",
            "/img/Proyecto01/QUINCHO_AF/quincho03.webp",
            "/img/Proyecto01/QUINCHO_AF/quincho04.webp",
            "/img/Proyecto01/QUINCHO_AF/quincho05.webp",
            "/img/Proyecto01/QUINCHO_AF/quincho06.webp",
            "/img/Proyecto01/QUINCHO_AF/quincho07.webp"
        ]
    },
    {
        id: "locales-comerciales",
        tipo: "proyecto",
        titulo: "Locales Comerciales",
        categoria: "Arquitectura Comercial",
        descripcion: "Diseño arquitectónico comercial de alto impacto. Fachadas modernas con iluminación estratégica y distribución optimizada para maximizar la visibilidad y el flujo de clientes.",
        imagenPrincipal: "/img/Proyecto02/LOCALES_COMERCIALES/locales08.webp",
        
        // Aquí están las 8 fotos que extraje de tu HTML para el Lightbox
        galeria: [
            "/img/Proyecto02/LOCALES_COMERCIALES/locales01.webp",
            "/img/Proyecto02/LOCALES_COMERCIALES/locales02.webp",
            "/img/Proyecto02/LOCALES_COMERCIALES/locales03.webp",
            "/img/Proyecto02/LOCALES_COMERCIALES/locales04.webp",
            "/img/Proyecto02/LOCALES_COMERCIALES/locales05.webp",
            "/img/Proyecto02/LOCALES_COMERCIALES/locales06.webp",
            "/img/Proyecto02/LOCALES_COMERCIALES/locales07.webp",
            "/img/Proyecto02/LOCALES_COMERCIALES/locales08.webp"
        ]
    },


    //               DISEÑOSS

    {
        id: "casa-sc",
        tipo: "diseno", // Para la galería de Diseños Personalizados
        titulo: "Casa SC",
        categoria: "Diseño Personalizado",
        descripcion: "Arquitectura estilo chileno contemporáneo. Destacan sus amplios corredores exteriores de madera y grandes ventanales que conectan el interior con el paisaje natural.",
        imagenPrincipal: "/img/Plano01/CASA_SC/casa_sc06.webp",
        
        // Aquí están las 6 fotos de la galería de la Casa SC
        galeria: [
            "/img/Plano01/CASA_SC/casa_sc01.webp",
            "/img/Plano01/CASA_SC/casa_sc02.webp",
            "/img/Plano01/CASA_SC/casa_sc03.webp",
            "/img/Plano01/CASA_SC/casa_sc04.webp",
            "/img/Plano01/CASA_SC/casa_sc05.webp",
            "/img/Plano01/CASA_SC/casa_sc06.webp"
        ]
    },

    {
        id: "casa-pinos",
        tipo: "diseno", // Para la galería de Diseños Personalizados
        titulo: "Casa Pinos",
        categoria: "Diseño Personalizado",
        descripcion: "Un refugio moderno diseñado para la desconexión total. La estructura se integra respetuosamente entre los árboles, ofreciendo privacidad absoluta y vistas panorámicas del bosque desde cada habitación, difuminando el límite entre interior y exterior.",
        imagenPrincipal: "/img/Plano02/CASA_PINOS/casa_pinos02.webp",
        estiloImagen: { objectPosition: '50% 62%' }, // ¡Rescatamos tu ajuste CSS!
        
        // Aquí están las 3 fotos de la galería de la Casa Pinos
        galeria: [
            "/img/Plano02/CASA_PINOS/casa_pinos01.webp",
            "/img/Plano02/CASA_PINOS/casa_pinos02.webp",
            "/img/Plano02/CASA_PINOS/casa_pinos03.webp"
        ]
    },

    {
        id: "casa-ng",
        tipo: "diseno", // Para la galería de Diseños Personalizados
        titulo: "Casa NG",
        categoria: "Diseño Personalizado",
        descripcion: "Una casa diseñada para compartir. Su distribución conecta todos los espacios interiores con una gran terraza central, donde un fogón en obra se convierte en el corazón del hogar, ideal para disfrutar las tardes al aire libre con total privacidad.",
        imagenPrincipal: "/img/Plano03/CASANG/casang02.webp",
        
        // Aquí están las 5 fotos de la galería de la Casa NG
        galeria: [
            "/img/Plano03/CASANG/casang01.webp",
            "/img/Plano03/CASANG/casang02.webp",
            "/img/Plano03/CASANG/casang03.webp",
            "/img/Plano03/CASANG/casang04.webp",
            "/img/Plano03/CASANG/casang05.webp"
        ]
    },

    {
        id: "casa-mh",
        tipo: "diseno", // Se irá automáticamente a la galería de Diseños Personalizados
        titulo: "Casa MH",
        categoria: "Diseño Personalizado",
        descripcion: "Un diseño que respira tranquilidad y orden. Sus espacios se abren hacia el jardín mediante ventanales de piso a cielo, incluyendo detalles únicos como ventanas en esquina y caminos de acceso en gravilla que invitan a recorrer el exterior.",
        imagenPrincipal: "/img/Plano04/CASAMH/casamh03.webp",
        
        // Aquí están las 3 fotos de la galería que tenías en el HTML
        galeria: [
            "/img/Plano04/CASAMH/casamh01.webp",
            "/img/Plano04/CASAMH/casamh02.webp",
            "/img/Plano04/CASAMH/casamh03.webp"
        ]
    },
    {
        id: "casa-hp",
        tipo: "diseno", // Se irá a la galería de Diseños Personalizados
        titulo: "Casa HP",
        categoria: "Diseño Personalizado",
        descripcion: "Una vivienda diseñada para impresionar. La arquitectura juega con la continuidad visual: el muro de piedra exterior ingresa al salón principal, borrando el límite entre adentro y afuera. Ideal para quienes buscan sofisticación y calidez en un mismo espacio.",
        imagenPrincipal: "/img/Plano05/CASAHP/casahp01.webp",
        
        // Aquí están las 4 fotos de la galería
        galeria: [
            "/img/Plano05/CASAHP/casahp01.webp",
            "/img/Plano05/CASAHP/casahp02.webp",
            "/img/Plano05/CASAHP/casahp03.webp",
            "/img/Plano05/CASAHP/casahp04.webp"
        ]
    },
    {
        id: "casa-fr",
        tipo: "diseno", // Para la galería de Diseños Personalizados
        titulo: "Casa FR",
        categoria: "Diseño Personalizado",
        descripcion: "Arquitectura contemporánea de volúmenes sólidos inserta en un bosque de pinos. Su fachada en tonos grises y líneas geométricas genera un contraste moderno con el entorno natural.",
        imagenPrincipal: "/img/Plano06/CASAFR/casafr01.webp",
        
        // Aquí están las 7 fotos de la galería de la Casa FR
        galeria: [
            "/img/Plano06/CASAFR/casafr01.webp",
            "/img/Plano06/CASAFR/casafr02.webp",
            "/img/Plano06/CASAFR/casafr03.webp",
            "/img/Plano06/CASAFR/casafr04.webp",
            "/img/Plano06/CASAFR/casafr05.webp",
            "/img/Plano06/CASAFR/casafr06.webp",
            "/img/Plano06/CASAFR/casafr07.webp"
        ]
    },
    {
        id: "casa-cg",
        tipo: "diseno", // Para la galería de Diseños Personalizados
        titulo: "Casa CG",
        categoria: "Diseño Personalizado",
        descripcion: "Reinterpretación contemporánea de la arquitectura colonial chilena. Destacan sus amplios corredores perimetrales y un gran quincho revestido en piedra, ideal para la vida familiar.",
        imagenPrincipal: "/img/Plano07/CASACG/casacg03.webp",
        
        // Aquí están las 5 fotos de la galería de la Casa CG
        galeria: [
            "/img/Plano07/CASACG/casacg01.webp",
            "/img/Plano07/CASACG/casacg02.webp",
            "/img/Plano07/CASACG/casacg03.webp",
            "/img/Plano07/CASACG/casacg04.webp",
            "/img/Plano07/CASACG/casacg05.webp"
        ]
    },
    {
        id: "casa-01",
        tipo: "diseno", // Para la galería de Diseños Personalizados
        titulo: "Casa 01",
        categoria: "Diseño Personalizado",
        descripcion: "Una casa que equilibra lo moderno y lo tradicional. Sus techos altos con madera expuesta y los detalles en piedra natural crean ambientes amplios pero acogedores, perfectos para quienes buscan diseño y calidez de hogar en un mismo lugar.",
        imagenPrincipal: "/img/Plano08/CASA1/casa1_2.webp",
        
        // Aquí están las 5 fotos de la galería de la Casa 01
        galeria: [
            "/img/Plano08/CASA1/casa1_1.webp",
            "/img/Plano08/CASA1/casa1_2.webp",
            "/img/Plano08/CASA1/casa1_3.webp",
            "/img/Plano08/CASA1/casa1_4.webp",
            "/img/Plano08/CASA1/casa1_5.webp"
        ]
    },
    



];