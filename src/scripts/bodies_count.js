export const BODIES_KEY = 'BODIES';

export function setBodyCount() {
    const bodies = JSON.parse(localStorage.getItem(BODIES_KEY)) ?? [];
    const bodyCountElm = document.querySelector('span.body-count');
    bodyCountElm.textContent = bodies.length;
}

setBodyCount();
