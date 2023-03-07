gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

// Nav menu color change by click
$(".menu-btn").on("click", function () {
  $(".nav").toggleClass("nav-black");
});

// Nav Dark to Light Color Change
function navDarkLight() {
  $(".section.is--storytelling").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(".nav");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: "top top",
        scrub: 0.1
      }
    });
    tl.fromTo(
      targetElement,
      {
        color: "#1d1f30",
        duration: 0.1
      },
      {
        color: "#fff",
        duration: 0.1
      }
    );
  });
}

// About page Line by Line text animation

// Nav Light to Dark Color Change
function navLightDark() {
  $(".section.is--pricing, .track").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(".nav");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top top",
        end: "top top",
        //scroller: ".page-wrapper",
        scrub: 0.1
      }
    });
    tl.to(targetElement, {
      color: "#1d1f30",
      duration: 0.1
    });
  });
}
// Nav Light to Dark Color Change
function navDarkBlue() {
  $(".track").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(".nav");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        // can also use "20px 80%"
        start: "top top",
        end: "top top",
        //scroller: ".page-wrapper",
        scrub: 0.1
      }
    });
    tl.to(targetElement, {
      color: "#463ED6",
      duration: 0.1
    });
  });
}

// BADGE on hover______________________________________________
gsap.set(".b-txt", { xPercent: -50, yPercent: -50 });

function follower(target, duration) {
  let xTo = gsap.quickTo(target, "x", { duration: duration, ease: "power3" }),
    yTo = gsap.quickTo(target, "y", { duration: duration, ease: "power3" });
  return (x, y) => {
    xTo(x);
    yTo(y);
  };
}

let followers = gsap.utils
  .toArray(".b-txt")
  .reverse()
  .map((el, i) => follower(el, 0.4 + i * 0.2));

window.addEventListener("mousemove", (e) => {
  followers.forEach((f) => f(e.x / 2, e.y / 2));
});

// ___________________________________________________________

// SVG elements parallax speed vertical
function parallaxMove() {
  var parallaxItems = gsap.utils.toArray("[data-module-parallax]");
  parallaxItems.forEach((section) => {
    gsap.utils
      .toArray(section.querySelectorAll("[data-parallax]"))
      .forEach((parallax) => {
        const depth = parallax.dataset.speed;
        const movement = -(parallax.offsetHeight * depth);

        gsap.fromTo(
          parallax,
          {
            y: -movement,
            rotation: -40 * 1
          },
          {
            y: movement,
            rotation: 40 * 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              scrub: 2
            }
          }
        );
      });
  });
}
// SVG element on hover
function svgHover() {
  var svgItem = gsap.utils.toArray(".s_e");
  svgItem.forEach((link) => {
    let tween = gsap
      .to(link, {
        duration: 1,
        rotation: 360,
        transformOrigin: "center center"
      })
      .reversed(true);

    link.anim = tween;
    link.addEventListener("mouseenter", () => link.anim.play());
    link.addEventListener("mouseleave", () => link.anim.restart());
  });
}

// SVG elements parallax speed horizontal
function parallaxMoveHor() {
  var parallaxItems = gsap.utils.toArray("[data-module-parallax-hor]");
  parallaxItems.forEach((section) => {
    gsap.utils
      .toArray(section.querySelectorAll("[data-parallax]"))
      .forEach((parallax) => {
        const depth = parallax.dataset.speed;
        const movement = -(parallax.offsetHeight * depth);

        gsap.fromTo(
          parallax,
          {
            x: -movement,
            rotation: -40 * 1
          },
          {
            x: movement,
            rotation: 40 * 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              scrub: 2
            }
          }
        );
      });
  });
}

function randomMove() {
  var elements = gsap.utils.toArray(".elem-wrap");

  var airfield = document.querySelector(".elements-parallax.is--pricing"),
    airfieldWidth = airfield.offsetWidth,
    airfieldHeight = airfield.offsetHeight;

  gsap.set(elements, { xPercent: -40, yPercent: -40 });

  // x/y values for how far away from the center they can move
  var dx = airfieldWidth * 0.3;
  var dy = airfieldHeight * 0.3;

  elements.forEach((number, index) => {
    tweenProperty(elements[index], "x", -dx, dx);
    tweenProperty(elements[index], "y", -dy, dy);
  });

  function tweenProperty(target, prop, min, max) {
    gsap.to(target, {
      [prop]: gsap.utils.random(min, max),
      duration: "random(20, 30)",
      ease: "ease",
      onComplete: tweenProperty,
      onCompleteParams: [target, prop, min, max]
    });
  }
}

// ----> Text animations

function splitChar(target, delay) {
  document.fonts.ready.then((fontFaceSet) => {
    gsap.utils.toArray(target).forEach((target) => {
      const mySplitText = new SplitText(target, {
        type: "words, chars",
        delay: 1
      });

      TweenLite.set(target, { perspective: 400 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: "top 60%"
        },
        onComplete: () => {
          mySplitText.revert();
        }
      });

      tl.staggerFrom(
        mySplitText.chars,
        1,
        {
          opacity: 0,
          scale: 1,
          y: 210,
          translateX: 20,
          delay: delay,
          ease: Power4.easeOut
        },
        0.05,
        "+=0"
      );
    });
  });
}

// Split Text animation Scroll in

function splitLines(target, delay) {
  document.fonts.ready.then((fontFaceSet) => {
    gsap.utils.toArray(target).forEach((target) => {
      const mySplitText = new SplitText(target, {
        type: "lines",
        delay: 1
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: "top 100%"
        },
        onComplete: () => {
          mySplitText.revert();
        }
      });

      tl.staggerFrom(
        mySplitText.lines,
        1,
        {
          opacity: 0,
          scale: 1,
          y: 60,
          delay: delay,
          ease: Power4.easeOut
        },
        0.1
      );
    });
  });
}

// functions ->

function init() {
  navDarkLight();
  navLightDark();
  navDarkBlue();
  svgHover();
  parallaxMove();
  parallaxMoveHor();
  splitLines(".splittxt-hero", 1.7);
  splitLines(".splittxt", 0.3);
  splitChar(".splitchr-hero", 1.5);
  splitChar(".splitchr", 0.3);
}

window.addEventListener("load", function () {
  init();
});
