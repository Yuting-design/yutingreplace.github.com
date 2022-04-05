(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const bunny = document.querySelector('#bunny');
    const ring =  document.querySelector('#ring');
    const projects = document.querySelector('#projects');
    const research = document.querySelector('#research');
    const development = document.querySelector('#development');
    const final = document.querySelector('#final');
    const h1 = document.querySelector('h1')


    const h3s = document.querySelectorAll('h3')
    const sections = document.querySelectorAll('section')
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            bunny.className = 'switch';
            ring.className = 'switch';
            h1.className = 'switch';
            projects.className = 'switch';
            development.className = 'switch';
            final.className = 'switch';
            research.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            for (const h3 of h3s) {
                h3.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            bunny.removeAttribute('class');
            ring.removeAttribute('class');
            h1.removeAttribute('class');
            projects.removeAttribute('class');
            development.removeAttribute('class');
            final.removeAttribute('class');
            research.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            for (const h3 of h3s) {
                h3.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()