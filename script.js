let hamburger = document.querySelector(".hamburger")
    let sidebar = document.querySelector(".sidebar")
    let closeicon = document.querySelector(".closeicon")

    hamburger.addEventListener("click", () => {
        sidebar.style.transform = "translateX(0)"
        hamburger.classList.add("hidden")
        closeicon.classList.remove("hidden")
    })
    closeicon.addEventListener("click", () => {
        sidebar.style.transform = "translateX(100%)"
        hamburger.classList.remove("hidden")
        closeicon.classList.add("hidden")
    })

    const initialTranslateLTR = -48 * 4;
    const initialTranslateRTL = 36 * 4;

    function setupIntersectionObserver(element, isLTR, speed) {
        const intersectionCallback = (entries) => {
            const isIntersecting = entries[0].isIntersecting;
            if (isIntersecting) {
                document.addEventListener('scroll', scrollHandler);
            } else {
                document.removeEventListener('scroll', scrollHandler);
            }
        }
        const intersectionObserver = new IntersectionObserver(intersectionCallback);

        intersectionObserver.observe(element);

        function scrollHandler() {
            const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;

            let totalTranslate = 0;
            if (isLTR) {
                totalTranslate = translateX + initialTranslateLTR;
            } else {
                totalTranslate = -(translateX + initialTranslateRTL);
            }

            element.style.transform = `translateX(${totalTranslate}px)`;
        }

    }

    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');


    setupIntersectionObserver(line1, true, 0.15);
    setupIntersectionObserver(line2, false, 0.15);
    setupIntersectionObserver(line3, true, 0.15);
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.closest('.accordion');
            const content = accordion.querySelector('.accordion-content');
            const arrow = accordion.querySelector('.arrow');

            // Toggle content
            content.classList.toggle('grid-rows-[0fr]');
            content.classList.toggle('grid-rows-[1fr]');

            // Rotate arrow
            arrow.classList.toggle('rotate-0');
            arrow.classList.toggle('rotate-180');
        });
    });

    // darkmode toggle

    let theme = document.querySelector(".theme")
    let enabledarkmode = () => {
        document.body.classList.add("dark")
        localStorage.setItem("dark", "active")
    }

    let disabledarkmode = () => {
        document.body.classList.remove("dark")
        localStorage.setItem("dark", null)
    }

    theme.addEventListener("click", () => {
        if (!document.body.classList.contains("dark")) {
            enabledarkmode()
        }
        else {
            disabledarkmode()
        }
    })
