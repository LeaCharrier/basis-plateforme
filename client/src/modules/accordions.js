import gsap from 'gsap';

export default class Accordions {
    constructor() {
        // Settings
        this.settings = {
            elements: document.querySelectorAll('.accordion'),
            duration: .3,
            ease: 'power4.out'
        };
    }

    init() {
        // Default state
        [...this.settings.elements].forEach(el => {

            el.getAttribute('data-state') === 'closed' 
            ? this.close(el)
            : this.open(el)
            
        });
    }

    listenClick() {
        // Toggle state onclick
        // header.addEventListener('click', () => {
        //     content.getAttribute('data-state') === 'open'
        //     ? this.close(content) 
        //     : this.open(content)
        // });
    }

    open(el) {
        el.setAttribute('data-state', 'open');
        gsap.fromTo(
            el,
            {
                height: el.offsetHeight + 'px'
            },
            {
                height: 'auto',
                duration: this.settings.duration,
                ease: this.settings.ease
            }
        );
    }

    close(el) {
        el.setAttribute('data-state', 'closed');
        gsap.to(el, {
            height: 0,
            duration: this.settings.duration,
            ease: this.settings.ease
        });
    }
}