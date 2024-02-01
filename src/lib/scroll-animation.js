import gsap from "gsap";

export const scrollAnimation = (position, target, ismobile, onUpdate) => {
    const tl = gsap.timeline();


    tl.to(position, {
        x: !ismobile ? -3.38 : -7.0,
        y: !ismobile ? -10.74 : -12.2,
        z: !ismobile ? -5.93 : -6.0,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
        onUpdate
    }).to(target, {
        x: !ismobile ? 1.53 : 0.7,
        y: !ismobile ? 0.77 : 0.9,
        z: !ismobile ? -1.08 : 0.7,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    }).to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        }
    }).to(".sound-section-content", {
        opacity: 1,
        scrollTrigger: {
            trigger: ".sound-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    }).to(position, {
        x: !ismobile ? 1.56 : 9.36,
        y: !ismobile ? 5.0 : 8,
        z: !ismobile ? 0.01 : 0.09,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
        onUpdate
    }).to(target, {
        x: !ismobile ? -0.55 : -1,
        y: !ismobile ? 0.6 : 0.02,
        z: !ismobile ? 0.0 : -0.06,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    }).to(".display-section", {
        opacity: 1,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 2,
            immediateRender: false,
        },
    })
};