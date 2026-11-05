
/* ==========================================
   LAS TÍAS CAMPESTRE
   FESTIVAL DEL GLOBO
   SCRIPT.JS - VERSIÓN 2
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* ========================================
     01. CONFIGURACIÓN GENERAL
  ======================================== */

  const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const elementosAnimados = document.querySelectorAll(
    "[data-animate]"
  );

  const cupon = document.querySelector(
    ".cupon-ticket"
  );

  const barraCupon = document.querySelector(
    ".mobile-cupon-link"
  );

  const botonHero = document.querySelector(
    ".btn-lt-primary"
  );

  const footer = document.querySelector(
    ".footer-las-tias"
  );

  let cuponAnimado = false;


  /* ========================================
     02. ANIMACIONES AL HACER SCROLL
  ======================================== */

  function iniciarAnimaciones() {

    if (
      reducirMovimiento.matches ||
      !("IntersectionObserver" in window)
    ) {

      elementosAnimados.forEach((elemento) => {
        elemento.classList.add("is-visible");
      });

      return;
    }

    /*
      Activamos las transiciones que ya
      configuramos en styles.css.
    */

    document.body.classList.add(
      "js-animations"
    );


    /* Animaciones escalonadas de fotografías */

    const fotografias = document.querySelectorAll(
      ".food-item"
    );

    fotografias.forEach((foto, indice) => {

      const retraso = (indice % 3) * 90;

      foto.style.transitionDelay =
        `${retraso}ms`;

    });


    /* Observer principal */

    const observador = new IntersectionObserver(
      (entradas, observer) => {

        entradas.forEach((entrada) => {

          if (!entrada.isIntersecting) {
            return;
          }

          const elemento = entrada.target;

          elemento.classList.add(
            "is-visible"
          );


          /* Animación especial del cupón */

          if (
            elemento.classList.contains(
              "cupon-ticket"
            )
          ) {

            if (!cuponAnimado) {

              cuponAnimado = true;

              setTimeout(() => {

                animarPorcentaje();

              }, 400);

            }

          }

          observer.unobserve(elemento);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );


    elementosAnimados.forEach((elemento) => {

      observador.observe(elemento);

    });

  }


  /* ========================================
     03. ANIMACIÓN DEL 10%
  ======================================== */

  function animarPorcentaje() {

    if (reducirMovimiento.matches) {
      return;
    }

    const porcentaje = document.querySelector(
      ".cupon-porcentaje"
    );

    if (!porcentaje || !porcentaje.animate) {
      return;
    }

    porcentaje.animate(
      [
        {
          transform: "scale(0.78)",
          opacity: 0.4
        },
        {
          transform: "scale(1.09)",
          opacity: 1,
          offset: 0.72
        },
        {
          transform: "scale(1)",
          opacity: 1
        }
      ],
      {
        duration: 850,
        easing: "cubic-bezier(.2,.8,.2,1)",
        iterations: 1
      }
    );

  }


  /* ========================================
     04. NAVEGACIÓN SUAVE
  ======================================== */

  function iniciarNavegacion() {

    const enlaces = document.querySelectorAll(
      'a[href^="#"]'
    );

    enlaces.forEach((enlace) => {

      enlace.addEventListener(
        "click",
        (evento) => {

          const destinoID =
            enlace.getAttribute("href");

          if (
            !destinoID ||
            destinoID === "#"
          ) {
            return;
          }

          const destino = document.querySelector(
            destinoID
          );

          if (!destino) {
            return;
          }

          evento.preventDefault();

          destino.scrollIntoView({
            behavior: reducirMovimiento.matches
              ? "instant"
              : "smooth",
            block: "start"
          });

          /*
            Conservamos el identificador
            de sección en la URL.
          */

          history.replaceState(
            null,
            "",
            destinoID
          );

        }
      );

    });

  }


  /* ========================================
     05. BOTÓN FLOTANTE DEL CUPÓN
  ======================================== */

  function iniciarBarraCupon() {

    if (!barraCupon) {
      return;
    }

    /*
      La barra se ocultará cuando:
      - El botón principal esté visible.
      - El cliente esté viendo el cupón.
      - El cliente llegue al footer.
    */

    if (!("IntersectionObserver" in window)) {
      return;
    }

    let heroVisible = false;
    let cuponVisible = false;
    let footerVisible = false;


    function actualizarBarra() {

      const ocultar =
        heroVisible ||
        cuponVisible ||
        footerVisible;

      barraCupon.classList.toggle(
        "d-none",
        ocultar
      );

    }


    const observadorBarra =
      new IntersectionObserver(
        (entradas) => {

          entradas.forEach((entrada) => {

            if (entrada.target === botonHero) {

              heroVisible =
                entrada.isIntersecting;

            }

            if (entrada.target === cupon) {

              cuponVisible =
                entrada.isIntersecting;

            }

            if (entrada.target === footer) {

              footerVisible =
                entrada.isIntersecting;

            }

          });

          actualizarBarra();

        },
        {
          threshold: 0.05
        }
      );


    if (botonHero) {
      observadorBarra.observe(botonHero);
    }

    if (cupon) {
      observadorBarra.observe(cupon);
    }

    if (footer) {
      observadorBarra.observe(footer);
    }

  }


  /* ========================================
     06. EFECTO INTERACTIVO EN BOTONES
  ======================================== */

  function iniciarEfectosBotones() {

    if (reducirMovimiento.matches) {
      return;
    }

    const botones = document.querySelectorAll(
      ".btn-lt-primary, .btn-lt-maps"
    );

    botones.forEach((boton) => {

      boton.addEventListener(
        "pointerdown",
        () => {

          if (!boton.animate) {
            return;
          }

          boton.animate(
            [
              {
                scale: 1
              },
              {
                scale: 0.96
              },
              {
                scale: 1
              }
            ],
            {
              duration: 230,
              easing: "ease-out"
            }
          );

        }
      );

    });

  }


  /* ========================================
     07. FOTOGRAFÍAS
  ======================================== */

  function optimizarFotografias() {

    const imagenes = document.querySelectorAll(
      ".food-gallery img"
    );

    imagenes.forEach((imagen) => {

      imagen.loading = "lazy";
      imagen.decoding = "async";

    });

  }


  /* ========================================
     08. ENLACES SOCIALES
  ======================================== */

  function revisarRedes() {

    /*
      Mientras no tengas la URL
      definitiva de Facebook, evitamos
      abrir un enlace incorrecto.
    */

    const enlacesPendientes =
      document.querySelectorAll(
        'a[href*="REEMPLAZAR_PAGINA"]'
      );

    enlacesPendientes.forEach((enlace) => {

      enlace.removeAttribute("href");

      enlace.setAttribute(
        "aria-disabled",
        "true"
      );

      enlace.setAttribute(
        "title",
        "Facebook pendiente de configurar"
      );

      enlace.style.opacity = "0.45";
      enlace.style.pointerEvents = "none";

    });

  }


  /* ========================================
     09. ANIMACIONES DE GLOBOS
  ======================================== */

  function configurarGlobos() {

    /*
      El movimiento principal de los
      globos está definido en styles.css.

      Aquí agregamos pequeñas diferencias
      en la duración de las animaciones.
    */

    const globos = document.querySelectorAll(
      ".globo"
    );

    if (reducirMovimiento.matches) {
      return;
    }

    globos.forEach((globo, indice) => {

      const duraciones = [
        6.5,
        8
      ];

      globo.style.animationDuration =
        `${duraciones[indice % duraciones.length]}s`;

    });

  }


  /* ========================================
     10. INICIALIZACIÓN
  ======================================== */

  iniciarAnimaciones();

  iniciarNavegacion();

  iniciarBarraCupon();

  iniciarEfectosBotones();

  optimizarFotografias();

  revisarRedes();

  configurarGlobos();


  console.log(
    "Las Tías Campestre - Landing inicializada"
  );

});
