// Intersection Observer for scroll animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                // Remove animation class when element leaves viewport
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px' // Triggers animation slightly before element comes into view
    });

    // Observe all animated elements
    const elementsToAnimate = [
        '.tl-home-intro-text',
        '.tl-about-image',
        '.tl-about-data'
    ].forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});


/******************************************************************************
 * Skills
 ******************************************************************************/
const observeSkills = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe skills sections
    document.querySelectorAll('.tl-skills-content').forEach(element => {
        observer.observe(element);
    });
};

// Update your DOM loaded event listener
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    observeSkills();
});

/******************************************************************************
 * Experience
 ******************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.tl-timeline-item');
    const overlay = document.querySelector('.tl-popup-overlay');
    let currentPopup = null;

    // Timeline scroll animation
    const observeTimeline = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Remove the animation class when element is not in view
                if (!entry.isIntersecting) {
                    entry.target.classList.remove('animate');
                } else {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    };

    // Popup functionality
    function openPopup(id) {
        const popup = document.getElementById(id);
        if (popup) {
            overlay.classList.add('active');
            popup.classList.add('active');
            currentPopup = popup;
            document.body.style.overflow = 'hidden';
        }
    }

    function closePopup() {
        if (currentPopup) {
            overlay.classList.remove('active');
            currentPopup.classList.remove('active');
            currentPopup = null;
            document.body.style.overflow = '';
        }
    }

    // Event Listeners
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const experienceId = item.getAttribute('data-experience');
            openPopup(experienceId);
        });
    });

    document.querySelectorAll('.tl-popup-close').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            closePopup();
        });
    });

    overlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentPopup) {
            closePopup();
        }
    });

    // Initialize
    observeTimeline();
});

/******************************************************************************
 * Projects
 ******************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.tl-project-card');
    const categoryBtns = document.querySelectorAll('.tl-category-btn');
    const overlay = document.querySelector('.tl-popup-overlay');
    const projectSection = document.querySelector('.projects');
    let currentPopup = null;

    // Animation Observer
    const createObserver = (elements) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Remove animation class when element leaves viewport
                if (!entry.isIntersecting) {
                    entry.target.classList.remove('animate');
                    // Reset transition delay to ensure proper re-animation
                    entry.target.style.transitionDelay = '0s';
                    return;
                }

                // Add animation class and calculate delay
                const index = Array.from(elements).indexOf(entry.target);
                const delay = (index * 0.1) + (entry.target.classList.contains('tl-category-btn') ? 0 : 0.2);
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('animate');
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => observer.observe(element));
    };

    // Initialize Animations
    createObserver(categoryBtns);
    createObserver(projectCards);

    // Filter Projects
    const filterProjects = (category) => {
        projectCards.forEach((card, index) => {
            const categories = card.dataset.categories.split(',');
            const shouldShow = category === 'all' || categories.includes(category);

            // Reset animation state
            card.classList.remove('animate');
            card.classList.toggle('hidden', !shouldShow);

            if (shouldShow) {
                card.classList.add('visible');
                // Add small delay before re-animating
                setTimeout(() => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                    card.classList.add('animate');
                }, 50);
            } else {
                card.classList.remove('visible');
            }
        });
    };

    // Category Button Events
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.dataset.category);
        });
    });

    // Popup Functions
    const togglePopup = (show, popup = null) => {
        if (show && popup) {
            overlay.classList.add('active');
            popup.classList.add('active');
            currentPopup = popup;
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('active');
            if (currentPopup) currentPopup.classList.remove('active');
            currentPopup = null;
            document.body.style.overflow = '';
        }
    };

    // Event Listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const popup = document.getElementById(card.dataset.project);
            togglePopup(true, popup);
        });
    });

    document.querySelectorAll('.tl-popup-close').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePopup(false);
        });
    });

    overlay.addEventListener('click', () => togglePopup(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentPopup) {
            togglePopup(false);
        }
    });
});

/******************************************************************************
 * Contact
 * ****************************************************************************/
const observeContact = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Remove animation when out of view
            if (!entry.isIntersecting) {
                entry.target.classList.remove('animate');
                // Reset transition delay to ensure proper re-animation
                entry.target.style.transitionDelay = '0s';
                return;
            }

            // Add animation when in view
            const index = Array.from(document.querySelectorAll('.tl-contact-info')).indexOf(entry.target);
            const delay = `${index * 0.1}s`;
            entry.target.style.transitionDelay = delay;
            entry.target.classList.add('animate');
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.tl-contact-info').forEach(item => {
        observer.observe(item);
    });
};

// Add to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    observeContact();
});


/******************************************************************************
 * Navbar
 ******************************************************************************/
// Navigation functionality
const header = document.getElementById("header");
const navMenu = document.getElementById("tl-nav-menu");
const navButtonToggle = document.getElementById("tl-nav-button-toggle");
const navClose = document.getElementById("tl-nav-menu-close");
const navLinks = document.querySelectorAll(".tl-nav-menu-item-link");
const sections = document.querySelectorAll(".tl-section");

// Toggle menu functionality
const toggleMenu = () => {
    navMenu.classList.toggle("show-menu");
};

// Close menu
const closeMenu = () => {
    navMenu.classList.remove("show-menu");
};

// Scroll to section with smooth animation
const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        closeMenu();
        const headerOffset = 0;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

// Add/remove active class from nav items based on scroll position
const updateActiveNavItem = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        const navLink = document.querySelector(
            `.tl-nav-menu-item-link[href*='${sectionId}']`
        );

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("tl-nav-menu-item-link-active");
            } else {
                navLink.classList.remove("tl-nav-menu-item-link-active");
            }
        }
    });
};

// Add/remove header shadow on scroll
const updateHeaderShadow = () => {
    if (window.scrollY >= 80) {
        header.classList.add("tl-header-not-top");
    } else {
        header.classList.remove("tl-header-not-top");
    }
};

// Event Listeners
navButtonToggle.addEventListener("click", toggleMenu);
navClose.addEventListener("click", closeMenu);
navLinks.forEach(link => link.addEventListener("click", scrollToSection));
window.addEventListener("scroll", () => {
    updateHeaderShadow();
    updateActiveNavItem();
});

// Initialize active nav item on page load
document.addEventListener("DOMContentLoaded", updateActiveNavItem);



// const navMenu = document.getElementById("tl-nav-menu");
// const navButtonToggle = document.getElementById("tl-nav-button-toggle");
// const navClose = document.getElementById("tl-nav-menu-close");
// const navMenuItemLink = document.querySelectorAll(".tl-nav-menu-item-link")

// /////////////////////////////////////////////////////////////
// /// Toggle menu
// navButtonToggle.addEventListener("click", ()=>{
//     if (navMenu.classList.contains("show-menu")) {
//         navMenu.classList.remove("show-menu");
//     } else {
//         navMenu.classList.add("show-menu");
//     }
// });

// /////////////////////////////////////////////////////////////
// /// Close menu
// navClose.addEventListener("click", ()=>{
//     navMenu.classList.remove("show-menu");
// });
// navMenuItemLink.forEach(link => {
//     link.addEventListener("click", () => {
//         const navMenu = document.getElementById("tl-nav-menu");
//         navMenu.classList.remove("show-menu");
//     });
// });

/////////////////////////////////////////////////////////////
// /// Activate link after scrolling
// window.addEventListener("scroll", () => {
//     const sections = document.querySelectorAll("section[id]");
//     const scrollY = window.pageYOffset;

//     sections.forEach(currentSection =>{
//         const sectionHeight = currentSection.offsetHeight;
//         const sectionTop = currentSection.offsetTop - 50;
//         const sectionId = currentSection.getAttribute("id");

//         if ((scrollY > sectionTop) && (scrollY <= sectionTop + sectionHeight)) {
//             document.querySelector(".tl-nav-menu a[href*=" + sectionId + "]").classList.add("tl-nav-menu-item-link-active");
//         } else {
//             document.querySelector(".tl-nav-menu a[href*=" + sectionId + "]").classList.remove("tl-nav-menu-item-link-active");
//         }
//     })
// })

/////////////////////////////////////////////////////////////
// /// Dark theme
// const themeButton = document.getElementById("tl-nav-button-change-theme");
// const darkTheme = "dark-theme";
// const iconTheme = "uil-sun";

// // Previously selected topic (if user selected)
// const selectedTheme = localStorage.getItem("selected-theme");
// const selectedIcon = localStorage.getItem("selected-icon");

// // We obtain the current theme that the interface has by validating the dark-theme class
// const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
// const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// // We validate if the user previously chose a topic
// if (selectedTheme) {
//     // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
//     document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
//     themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
// }

// // Activate / deactivate the theme manually with the button
// themeButton.addEventListener("click", () => {
//     // Add or remove the dark / icon theme
//     document.body.classList.toggle(darkTheme);
//     themeButton.classList.toggle(iconTheme);
//     // We save the theme and the current icon that the user chose
//     localStorage.setItem("selected-theme", getCurrentTheme());
//     localStorage.setItem("selected-icon", getCurrentIcon());
// })





// /////////////////////////////////////////////////////////////
// /// Header not top
// window.addEventListener("scroll", () => {
//     const nav = document.getElementById("header");
//     if (this.scrollY >= 80) {
//         nav.classList.add("tl-header-not-top");
//     } else {
//         nav.classList.remove("tl-header-not-top");
//     }
// });


/******************************************************************************
 * Home
 * Retrieved from https://www.npmjs.com/package/typewriter-effect
 ******************************************************************************/
const typewriterElement = document.querySelector("#typewriter");
if (typewriterElement) {
    new Typewriter(typewriterElement, {
        strings: ["a web developer", "a CS student", "a full stack developer", "a competitive programmer"],
        autoStart: true,
        loop: true,
        cursor: "|"
    });
} else {
    // Handle the case where the element with id "typewriter" is not found
    console.log("Element with id 'typewriter' not found. Skipping Typewriter initialization.");
    // You can also add alternative code or actions here if needed.
}


/******************************************************************************
 * Skills
 ******************************************************************************/
// const skillsContent = document.querySelectorAll(".tl-skills-content");
// const skillsHeaders = document.querySelectorAll(".tl-skills-head");
// skillsHeaders.forEach(skillHeader => {
//     skillHeader.addEventListener("click", () => {
//         const defaultParentClass = skillHeader.parentNode.className;

//         for (i = 0; i < skillsContent.length; i++) {
//             skillsContent[i].className = "tl-skills-content tl-skills-close";
//         }
        
//         if (defaultParentClass === "tl-skills-content tl-skills-close") {
//             skillHeader.parentNode.className = "tl-skills-content tl-skills-open";
//         }
//     });
// });


/******************************************************************************
 * Portfolio
 * Retrieved from https://codepen.io/bJhA/pen/NWjBaQb
 ******************************************************************************/
// var swiper = new Swiper(".blog-slider", {
//     spaceBetween: 30,
//     effect: "fade",
//     loop: true,
//     mousewheel:{
//         invert: false,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//       el: ".blog-slider__pagination",
//       clickable: true,
//     },
//     // mousewheel: true,
//     keyboard: true,
// });

/******************************************************************************
 * Scroll up top
 * Retrieved from https://codepen.io/bJhA/pen/NWjBaQb
 ******************************************************************************/
window.addEventListener("scroll", () => {
    const scrollUp = document.getElementById("tl-scroll-up");
    if (this.scrollY >= 560) {
        scrollUp.classList.add("tl-show-scroll");
    } else {
        scrollUp.classList.remove("tl-show-scroll");
    }
});
