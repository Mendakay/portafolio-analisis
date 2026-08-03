document.addEventListener('DOMContentLoaded', function() {

    // ─────────────────────────────────────────────
    //  Referencias DOM
    // ─────────────────────────────────────────────
    const cinematicIntro    = document.getElementById('cinematic-intro');
    const mainContent       = document.getElementById('main-content');
    const mobileMenuButton  = document.getElementById('mobile-menu-button');
    const mobileMenu        = document.getElementById('mobile-menu');
    const menuIcon          = document.getElementById('menu-icon');
    const closeIcon         = document.getElementById('close-icon');
    const backToTopButton   = document.getElementById('back-to-top');
    const currentYear       = document.getElementById('current-year');

    let currentLang = 'es';

    // ─────────────────────────────────────────────
    //  i18n: traducciones actualizadas al nuevo perfil
    // ─────────────────────────────────────────────
    const translations = {
        es: {
            welcomeTitle:    'Bienvenido a mi Portafolio',
            welcomeSubtitle: 'Explora proyectos donde los datos se convierten en decisiones, insights y sistemas que impactan.',
            welcomeAction:   'Haz Clic o Toca para Continuar',
            nameInitial:     'Guillermo',
            nav: {
                hero:        'Inicio',
                heroPrefix:  'Hola, soy',
                projects:    'Proyectos',
                about:       'Sobre Mí',
                skills:      'Habilidades',
                contact:     'Contacto'
            },
            role:            'Analista de Datos Junior | Practicante',
            viewProjectsButton: 'Ver Proyectos',
            projectsTitle:   'Proyectos',
            projectsSubtitle: 'Análisis de datos, visualización e inteligencia aplicada a salud pública, seguridad vial y diseño de sistemas centrados en datos sensibles.',
            behanceCtaTitle: 'Ver portafolio visual en Behance',
            behanceCtaDesc:  'Piezas de identidad, storytelling visual y sistemas gráficos con enfoque estratégico y de datos.',
            behanceCtaButton:'Conocer más',
            aboutTitle:      'Sobre Mí',
            about:           'Soy Analista de Datos Junior con enfoque en extraer insights accionables a partir de datos complejos. Mi trabajo se concentra en dos sectores donde la precisión analítica tiene impacto directo en la vida de las personas: salud pública y logística. Combino análisis exploratorio en RStudio y Python, visualización en Power BI, y diseño de sistemas de información en Figma para construir soluciones que optimizan procesos y apoyan la toma de decisiones basada en evidencia.',
            skillsTitle:     'Habilidades',
            techSkillsTitle: 'Habilidades Técnicas',
            softSkillsTitle: 'Habilidades Blandas',
            contactTitle:    '¡Hablemos!',
            contactText:     '¿Tienes una oportunidad en analítica de datos, salud o logística? Estoy listo para aportar con datos, visualización y criterio analítico.',
            sendEmail:       'Enviar Correo',
            name:            'Guillermo Tovar',
            projectButton:   'Ver proyecto'
        },
        en: {
            welcomeTitle:    'Welcome to my Portfolio',
            welcomeSubtitle: 'Explore projects where data becomes decisions, insights, and systems that make an impact.',
            welcomeAction:   'Click or Tap to Continue',
            nameInitial:     'Guillermo',
            nav: {
                hero:        'Home',
                heroPrefix:  "Hi, I'm",
                projects:    'Projects',
                about:       'About Me',
                skills:      'Skills',
                contact:     'Contact'
            },
            role:            'Junior Data Analyst | Intern',
            viewProjectsButton: 'View Projects',
            projectsTitle:   'Projects',
            projectsSubtitle: 'Data analysis, visualization, and applied intelligence for public health, road safety, and sensitive-data system design.',
            behanceCtaTitle: 'View visual portfolio on Behance',
            behanceCtaDesc:  'A curated selection of identity, visual storytelling, and digital design projects with strategic and data-driven intent.',
            behanceCtaButton:'Learn More',
            aboutTitle:      'About Me',
            about:           'I am a Junior Data Analyst focused on extracting actionable insights from complex data. My work centers on two sectors where analytical precision directly impacts people\'s lives: public health and logistics. I combine exploratory analysis in RStudio and Python, visualization in Power BI, and information system design in Figma to build solutions that optimize processes and support evidence-based decision-making.',
            skillsTitle:     'Skills',
            techSkillsTitle: 'Technical Skills',
            softSkillsTitle: 'Soft Skills',
            contactTitle:    "Let's Talk!",
            contactText:     'Do you have an opportunity in data analytics, healthcare, or logistics? I\'m ready to contribute with data, visualization, and analytical thinking.',
            sendEmail:       'Send Email',
            name:            'Guillermo Tovar',
            projectButton:   'View project'
        }
    };

    currentYear.textContent = new Date().getFullYear();


    // ─────────────────────────────────────────────
    //  Cinemática de entrada
    // ─────────────────────────────────────────────
    function exitIntro() {
        if (!cinematicIntro) return;

        cinematicIntro.style.opacity = '0';
        cinematicIntro.style.pointerEvents = 'none';

        setTimeout(() => {
            cinematicIntro.style.display = 'none';
            document.body.classList.remove('intro-active');

            if (mainContent) {
                mainContent.classList.remove('opacity-0');
                mainContent.classList.add('opacity-100');
            }

            setTimeout(() => {
                try {
                    initializeAnimations();
                } catch (error) {
                    console.error('No se pudieron inicializar las animaciones:', error);
                }
            }, 300);
        }, 700);
    }

    if (cinematicIntro) {
        cinematicIntro.setAttribute('role', 'button');
        cinematicIntro.setAttribute('tabindex', '0');

        cinematicIntro.addEventListener('click', exitIntro);
        cinematicIntro.addEventListener('touchend', function(event) {
            event.preventDefault();
            exitIntro();
        }, { passive: false });
        cinematicIntro.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                exitIntro();
            }
        });
    }


    // ─────────────────────────────────────────────
    //  Menú móvil
    // ─────────────────────────────────────────────
    if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });


    // ─────────────────────────────────────────────
    //  Scroll & navegación activa
    // ─────────────────────────────────────────────
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('data-target'));
        });
    });

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({ top: section.offsetTop - 70, behavior: 'smooth' });
        }
    }
    window.scrollToSection = scrollToSection;

    window.addEventListener('scroll', function() {
        // Back-to-top
        if (!backToTopButton) {
            updateActiveNavLink();
            activateOnScroll();
            return;
        }

        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            backToTopButton.classList.add('opacity-100');
        } else {
            backToTopButton.classList.add('opacity-0', 'pointer-events-none');
            backToTopButton.classList.remove('opacity-100');
        }
        updateActiveNavLink();
        activateOnScroll();
    });

    function updateActiveNavLink() {
        let currentSection = '';
        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop - 100;
            if (window.pageYOffset >= top && window.pageYOffset < top + section.offsetHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === currentSection);
        });
    }


    // ─────────────────────────────────────────────
    //  Datos: 4 proyectos de analítica de datos
    //  Cada proyecto lleva su propio acento visual
    //  para el renderizado dinámico de tarjetas.
    // ─────────────────────────────────────────────
    /*
     * Plantilla para futuros proyectos:
     *
     * {
     *     title: 'Nombre del proyecto',
     *     category: { es: 'Categoria ES', en: 'Category EN' },
     *     description: {
     *         es: 'Descripcion en espanol.',
     *         en: 'Description in English.'
     *     },
     *     tags: ['Herramienta 1', 'Herramienta 2', 'Tag extra', 'Tag extra'],
     *     icon: 'activity',
     *     badgeIcon: 'bar-chart-2',
     *     image: 'img/tu-imagen.jpg',
     *     imageAlt: 'Descripcion visual del proyecto',
     *     accent: {
     *         chip: 'border-rose-100 bg-rose-50 text-rose-700',
     *         iconWrap: 'bg-rose-50 text-rose-600 ring-1 ring-rose-100',
     *         hover: 'hover:border-rose-200 hover:shadow-[0_24px_70px_rgba(244,63,94,0.18)]',
     *         overlay: 'from-slate-950/70 via-slate-900/20 to-rose-300/10',
     *         category: 'text-rose-500',
     *         badge: 'text-rose-600',
     *         badgeBg: 'bg-white/85'
     *     },
     *     demoUrl: '#',
     *     codeUrl: '#'
     * }
     *
     * Pasos rapidos:
     * 1. Duplica uno de los objetos del arreglo `projects`.
     * 2. Cambia texto ES/EN, imagen y links.
     * 3. Si quieres otro color, reutiliza o adapta el bloque `accent`.
     */
    const projects = [
        {
            title: 'Violencia de G\u00e9nero en Colombia',
            category: { es: 'EDA \u00b7 Salud P\u00fablica', en: 'EDA \u00b7 Public Health' },
            description: {
                es: 'An\u00e1lisis exploratorio (EDA) en RStudio sobre microdatos nacionales para identificar patrones de riesgo.',
                en: 'Exploratory data analysis (EDA) in RStudio using national microdata to identify risk patterns.'
            },
            tags: ['RStudio', 'ggplot2', 'Microdatos', 'Salud P\u00fablica'],
            icon: 'activity',
            badgeIcon: 'bar-chart-2',
            image: 'img/Informe de R.jpg',
            imageAlt: 'Visualizaci\u00f3n del proyecto Violencia de G\u00e9nero en Colombia',
            accent: {
                chip: 'border-rose-100 bg-rose-50 text-rose-700',
                iconWrap: 'bg-rose-50 text-rose-600 ring-1 ring-rose-100',
                hover: 'hover:border-rose-200 hover:shadow-[0_24px_70px_rgba(244,63,94,0.18)]',
                overlay: 'from-slate-950/70 via-slate-900/20 to-rose-300/10',
                category: 'text-rose-500',
                badge: 'text-rose-600',
                badgeBg: 'bg-white/85'
            },
            demoUrl: 'https://rpubs.com/GuillermoTovar/1379642',
            codeUrl: 'https://github.com/Mendakay/Rstudio---Analisis-de-Violencia-Basada-en-G-nero-en-Colombia.git'
        },
        {
            title: 'Accidentalidad Vial 2025',
            category: { es: 'Dashboard \u00b7 Seguridad Vial', en: 'Dashboard \u00b7 Road Safety' },
            description: {
                es: 'Dashboard interactivo para la visualizaci\u00f3n de siniestros laborales y viales, enfocado en la toma de decisiones log\u00edsticas.',
                en: 'Interactive dashboard for visualizing occupational and road accidents, focused on logistics decision-making.'
            },
            tags: ['Power BI', 'KPIs', 'Geomapping', 'Visual Analytics'],
            icon: 'trending-up',
            badgeIcon: 'monitor',
            image: 'img/Analisis de Accidentalidad.png',
            imageAlt: 'Dashboard del proyecto Accidentalidad Vial 2025',
            accent: {
                chip: 'border-amber-100 bg-amber-50 text-amber-700',
                iconWrap: 'bg-amber-50 text-amber-600 ring-1 ring-amber-100',
                hover: 'hover:border-amber-200 hover:shadow-[0_24px_70px_rgba(245,158,11,0.18)]',
                overlay: 'from-slate-950/70 via-slate-900/20 to-amber-300/10',
                category: 'text-amber-500',
                badge: 'text-amber-600',
                badgeBg: 'bg-white/85'
            },
            demoUrl: 'https://www.behance.net/gallery/242483685/Data-Analytics-Occupational-Accident-Study',
            codeUrl: 'https://github.com/Mendakay/DASHBOARD-DE-AN-LISIS-Y-VISUALIZACI-N-DE-LA-ACCIDENTALIDAD-LABORAL-.git'
        },
        {
            title: 'Cattleya',
            category: { es: 'UX \u00b7 Arquitectura de Informaci\u00f3n', en: 'UX \u00b7 Information Architecture' },
            description: {
                es: 'Plataforma web de apoyo social con una arquitectura de informaci\u00f3n dise\u00f1ada para el manejo de datos sensibles y redes de apoyo.',
                en: 'Social support web platform with an information architecture designed for handling sensitive data and support networks.'
            },
            tags: ['Figma', 'UX Research', 'Arquitectura de Info', 'Datos Sensibles'],
            icon: 'database',
            badgeIcon: 'globe',
            image: 'img/Cattleya.PNG',
            imageAlt: 'Interfaz del proyecto Cattleya',
            accent: {
                chip: 'border-fuchsia-100 bg-fuchsia-50 text-fuchsia-700',
                iconWrap: 'bg-fuchsia-50 text-fuchsia-600 ring-1 ring-fuchsia-100',
                hover: 'hover:border-fuchsia-200 hover:shadow-[0_24px_70px_rgba(192,38,211,0.16)]',
                overlay: 'from-slate-950/70 via-slate-900/20 to-fuchsia-300/10',
                category: 'text-fuchsia-500',
                badge: 'text-fuchsia-600',
                badgeBg: 'bg-white/85'
            },
            demoUrl: 'https://cattleyadata.netlify.app/',
            codeUrl: 'https://github.com/EstebanJimenez2311/Cattleya.git'
        },
        {
            title: 'Vig\u00eda',
            category: { es: 'Prototipado \u00b7 Monitoreo', en: 'Prototyping \u00b7 Monitoring' },
            description: {
                es: 'Red de apoyo a comerciantes dedicada a combatir la extorsi\u00f3n mediante iniciativas de seguridad y canales de reporte integrados.',
                en: 'Support network for merchants focused on combating extortion through security initiatives and integrated reporting channels.'
            },
            tags: ['Figma', 'Georreferenciaci\u00f3n', 'Alertas RT', 'Alta Fidelidad'],
            icon: 'shield-alert',
            badgeIcon: 'shield-alert',
            image: 'img/Vigia.jpg',
            imageAlt: 'Interfaz del sistema Vig\u00eda',
            accent: {
                chip: 'border-sky-100 bg-sky-50 text-sky-700',
                iconWrap: 'bg-sky-50 text-sky-600 ring-1 ring-sky-100',
                hover: 'hover:border-sky-200 hover:shadow-[0_24px_70px_rgba(14,165,233,0.18)]',
                overlay: 'from-slate-950/70 via-slate-900/20 to-sky-300/10',
                category: 'text-sky-500',
                badge: 'text-sky-600',
                badgeBg: 'bg-white/85'
            },
            demoUrl: 'https://vigiadatainsights.netlify.app/',
            codeUrl: ''
        }
    ];

    // Ejemplo listo para copiar y pegar al final del arreglo `projects`:
    // ,
    // {
    //     title: 'Nuevo Proyecto',
    //     category: { es: 'Analitica · Categoria', en: 'Analytics · Category' },
    //     description: {
    //         es: 'Resume aqui el objetivo, el analisis y el impacto.',
    //         en: 'Summarize the goal, the analysis, and the impact here.'
    //     },
    //     tags: ['Python', 'SQL', 'Dashboard', 'Storytelling'],
    //     icon: 'line-chart',
    //     badgeIcon: 'monitor',
    //     image: 'img/nuevo-proyecto.jpg',
    //     imageAlt: 'Vista previa del nuevo proyecto',
    //     accent: {
    //         chip: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    //         iconWrap: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
    //         hover: 'hover:border-emerald-200 hover:shadow-[0_24px_70px_rgba(16,185,129,0.18)]',
    //         overlay: 'from-slate-950/70 via-slate-900/20 to-emerald-300/10',
    //         category: 'text-emerald-500',
    //         badge: 'text-emerald-600',
    //         badgeBg: 'bg-white/85'
    //     },
    //     demoUrl: '#',
    //     codeUrl: '#'
    // }

    // ─────────────────────────────────────────────
    //  Datos: habilidades técnicas y blandas
    //  featured: true → chip destacado (indigo sólido)
    // ─────────────────────────────────────────────
    const techSkills = [
        { label: 'SQL',            icon: 'database',    featured: true  },
        { label: 'Python · Pandas',icon: 'trending-up', featured: true  },
        { label: 'RStudio',        icon: 'bar-chart-2', featured: true  },
        { label: 'Power BI',       icon: 'monitor',     featured: true  },
        { label: 'Figma',          icon: 'figma',       featured: true  },
        { label: 'Looker Studio',  icon: 'layers',      featured: false },
        { label: 'HTML / CSS / JS',icon: 'code',        featured: false },
        { label: 'Git / GitHub',   icon: 'github',      featured: false },
        { label: 'Data Storytelling', icon: 'eye',      featured: false },
        { label: 'Excel Avanzado', icon: 'zap',         featured: false }
    ];

    const softSkills = [
        { label: { es: 'Pensamiento Analítico',   en: 'Analytical Thinking'   }, icon: 'trending-up'    },
        { label: { es: 'Atención al Detalle',     en: 'Attention to Detail'   }, icon: 'eye'            },
        { label: { es: 'Trabajo en Equipo',       en: 'Teamwork'              }, icon: 'heart-handshake'},
        { label: { es: 'Comunicación de Datos',   en: 'Data Communication'    }, icon: 'zap'            },
        { label: { es: 'Adaptabilidad',           en: 'Adaptability'          }, icon: 'layers'         },
        { label: { es: 'Resolución de Problemas', en: 'Problem Solving'       }, icon: 'shield-alert'   },
        { label: { es: 'Pensamiento Sistémico',   en: 'Systems Thinking'      }, icon: 'database'       }
    ];


    // ─────────────────────────────────────────────
    //  Renderizadores de tarjetas
    // ─────────────────────────────────────────────

    /**
     * Lucide eliminó los logos de marca (github, linkedin, figma) de su
     * set de iconos. Para esos casos se inyecta un <svg> propio en vez
     * de dejar que lucide.createIcons() los reemplace (deja el <i> vacío).
     */
    const BRAND_ICONS = {
        github: 'M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
        linkedin: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
        figma: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z'
    };

    /**
     * Devuelve el marcado de un icono: SVG inline para logos de marca
     * (ver BRAND_ICONS) o <i data-lucide> para el resto (renderizado
     * luego por lucide.createIcons()).
     */
    function renderIcon(name, cls) {
        const path = BRAND_ICONS[name];
        if (path) {
            return `<svg viewBox="0 0 24 24" class="${cls}" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;
        }
        return `<i data-lucide="${name}" class="${cls}"></i>`;
    }

    /**
     * Genera el HTML de una tarjeta de proyecto.
     * Diseño: cabecera coloreada + icono + descripción + tags + CTA.
     * No usa imágenes; el color de acento identifica cada categoría.
     */
    function createProjectCard(project) {
        const lang = currentLang;
        const category = typeof project.category === 'object' ? project.category[lang] : project.category;
        const description = typeof project.description === 'object' ? project.description[lang] : project.description;
        const hasDemo = Boolean(project.demoUrl);
        const hasCode = Boolean(project.codeUrl);

        const tags = project.tags.map((tag, index) => {
            const chipClass = index === 0
                ? project.accent.chip
                : 'border-slate-200 bg-slate-50 text-slate-700';
            return `<span class="rounded-full border px-3 py-1 text-xs font-medium ${chipClass}">${tag}</span>`;
        }).join('');

        return `
            <article class="project-card group overflow-hidden rounded-[28px] border border-white/60 bg-white/70 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${project.accent.hover}">
                <div class="relative h-56 overflow-hidden rounded-t-[28px]">
                    <img src="${project.image}" alt="${project.imageAlt}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-t ${project.accent.overlay}"></div>
                    <div class="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full ${project.accent.badgeBg} px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${project.accent.badge} backdrop-blur">
                        ${renderIcon(project.badgeIcon, 'w-4 h-4')}
                        ${project.tags[0]}
                    </div>
                </div>
                <div class="p-6 flex flex-col gap-5">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.22em] ${project.accent.category}">${category}</p>
                            <h3 class="mt-2 text-xl font-bold text-slate-900">${project.title}</h3>
                        </div>
                        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${project.accent.iconWrap}">
                            ${renderIcon(project.icon, 'w-6 h-6')}
                        </span>
                    </div>
                    <p class="text-sm leading-7 text-slate-600">${description}</p>
                    <div class="flex flex-wrap gap-2">${tags}</div>
                    <div class="flex items-center gap-3 pt-2">
                        <a href="${project.demoUrl}" ${hasDemo ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true" tabindex="-1"'}
                           class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${hasDemo ? 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700' : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'}">
                            <i data-lucide="external-link" class="w-4 h-4"></i>
                            Demo
                        </a>
                        <a href="${project.codeUrl || '#'}" ${hasCode ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true" tabindex="-1"'}
                           class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${hasCode ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-900 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'}">
                            ${renderIcon('github', 'w-4 h-4')}
                            C\u00f3digo
                        </a>
                    </div>
                </div>
            </article>`;
    }

    /**
     * Genera el HTML de un chip de habilidad técnica.
     * featured=true → fondo indigo sólido (core stack).
     * featured=false → fondo gris claro.
     */
    function createTechSkillItem(skill) {
        const cls = skill.featured
            ? 'skill-item inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md ring-2 ring-indigo-300'
            : 'skill-item inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-5 py-2 rounded-full';
        const iconCls = skill.featured ? 'w-4 h-4' : 'w-4 h-4 text-indigo-400';
        return `<span class="${cls}">${renderIcon(skill.icon, iconCls)}${skill.label}</span>`;
    }

    /**
     * Genera el HTML de un chip de habilidad blanda.
     */
    function createSoftSkillItem(skill) {
        const label = typeof skill.label === 'object' ? skill.label[currentLang] : skill.label;
        return `
            <span class="skill-item inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-5 py-2 rounded-full">
                ${renderIcon(skill.icon, 'w-4 h-4 text-indigo-400')}${label}
            </span>`;
    }


    // ─────────────────────────────────────────────
    //  Carga en el DOM
    // ─────────────────────────────────────────────

    function loadProjects() {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        grid.innerHTML = projects.map(p => createProjectCard(p)).join('');
        createLucideIcons();
    }

    function loadSkills() {
        const techContainer = document.getElementById('tech-skills-container');
        const softContainer = document.getElementById('soft-skills-container');
        if (techContainer) techContainer.innerHTML = techSkills.map(createTechSkillItem).join('');
        if (softContainer) softContainer.innerHTML = softSkills.map(createSoftSkillItem).join('');
        createLucideIcons();
    }


    // ─────────────────────────────────────────────
    //  Animaciones on-scroll
    // ─────────────────────────────────────────────

    function initializeAnimations() {
        loadProjects();
        loadSkills();

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('section-animate');
        });

        activateOnScroll();
    }

    function activateOnScroll() {
        const elements = document.querySelectorAll(
            '.section-animate, .project-card, .skill-item, #about-content'
        );
        elements.forEach(el => {
            const top    = el.getBoundingClientRect().top;
            const bottom = el.getBoundingClientRect().bottom;
            if (top < window.innerHeight && bottom > 0) {
                el.classList.add('visible');
            }
        });
    }


    // ─────────────────────────────────────────────
    //  Lucide: re-renderizar iconos inyectados por JS
    //  Se importan todos los iconos necesarios,
    //  incluyendo los nuevos: BarChart2, ShieldAlert.
    // ─────────────────────────────────────────────

    function createLucideIcons() {
        if (window.lucide) {
            lucide.createIcons();
            return;
        }

        window.setTimeout(() => {
            if (window.lucide) {
                lucide.createIcons();
            }
        }, 150);
    }


    // ─────────────────────────────────────────────
    //  Cambio de idioma
    // ─────────────────────────────────────────────

    const langToggleDesktop = document.getElementById('lang-toggle-desktop');
    const langToggleMobile  = document.getElementById('lang-toggle-mobile');
    const langTextDesktop   = document.getElementById('lang-text-desktop');

    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', toggleLanguage);
    }
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', toggleLanguage);
    }

    function toggleLanguage() {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        if (langTextDesktop) {
            langTextDesktop.textContent = currentLang === 'es' ? 'EN' : 'ES';
        }
        document.documentElement.lang = currentLang;
        updateLanguage();
        // Re-renderizar proyectos y skills en el nuevo idioma
        loadProjects();
        loadSkills();
        // Re-activar animaciones para los elementos recién inyectados
        setTimeout(activateOnScroll, 50);
    }

    function updateLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            let value = translations[currentLang];

            // Soporte para claves anidadas (ej: "nav.hero")
            for (const k of key.split('.')) {
                value = value?.[k];
            }
            if (!value) return;

            // Actualiza solo el texto del <span> visible cuando el elemento es
            // un enlace/botón con ícono + etiqueta, sin romper estructuras mixtas.
            const directChildren = Array.from(element.children);
            const iconAndLabelPattern =
                directChildren.length === 2 &&
                directChildren[0].tagName === 'I' &&
                directChildren[1].tagName === 'SPAN';

            if (iconAndLabelPattern) {
                directChildren[1].textContent = value;
            } else {
                element.textContent = value;
            }
        });
    }


    // ─────────────────────────────────────────────
    //  Inicialización sin cinemática (recarga directa)
    // ─────────────────────────────────────────────

    if (!document.body.classList.contains('intro-active')) {
        mainContent.classList.remove('opacity-0');
        mainContent.classList.add('opacity-100');
        setTimeout(() => { initializeAnimations(); }, 300);
    }


    // ─────────────────────────────────────────────
    //  Links de contacto / redes sociales
    //  → Actualiza aquí tus URLs reales
    // ─────────────────────────────────────────────

    const linkedinLinks = document.querySelectorAll('#link-linkedin, #contact-linkedin');
    const githubLinks   = document.querySelectorAll('#link-github, #contact-github');
    const mailLinks     = document.querySelectorAll('#link-mail, #contact-email-btn');

    linkedinLinks.forEach(l => l.href = 'https://www.linkedin.com/in/guillermo-rene-tovar-bele%C3%B1o-87a158294/');
    githubLinks.forEach(l   => l.href = 'https://github.com/Mendakay');
    mailLinks.forEach(l     => l.href = 'mailto:guillermorene1234@gmail.com');

});
