document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       MOBILES MENÜ
       ========================================= */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Icon wechseln
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Menü schliessen bei Klick auf Link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* =========================================
       KONTAKTFORMULAR (Formspree)
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    // WICHTIG: Ersetze dies durch deine Formspree-ID!
    // Beispiel: "https://formspree.io/f/xnnvarpvb"
    const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Prüfen, ob Platzhalter noch nicht ersetzt wurde
            if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
                formStatus.textContent = "Fehler: Bitte Formspree-ID in script.js eintragen.";
                formStatus.className = "form-status error";
                return;
            }

            formStatus.textContent = "Wird gesendet...";
            formStatus.className = "form-status";
            submitBtn.disabled = true;
            submitBtn.textContent = "Senden...";

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(FORM_ENDPOINT, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = "Danke! Deine Nachricht wurde erfolgreich versendet. Ich melde mich bei dir.";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = "Oops, da ist etwas schiefgelaufen. Bitte versuche es erneut.";
                    }
                    formStatus.className = "form-status error";
                }
            } catch (error) {
                formStatus.textContent = "Netzwerkfehler. Bitte prüfe deine Verbindung.";
                formStatus.className = "form-status error";
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Nachricht senden";
            }
        });
    }

    /* =========================================
       AKTUELLES JAHR IM FOOTER
       ========================================= */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* =========================================
       HEADER-SCHATTEN BEI SCROLL
       ========================================= */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });
});