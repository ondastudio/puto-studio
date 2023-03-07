gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

/*gsap.registerPlugin(ScrollSmoother);

let smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",

  effects: true
});

gsap.to(".sticky", {
  scrollTrigger: {
    trigger: ".section.is--storytelling",
    // start: "100px top",
    pin: true
    //    pinSpacing: false
  }
});
*/

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

//var badgeWrapper = document.querySelector(".badge-container");

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

// SVG element Move scale on hover
function svgHover() {
  var svgItem = gsap.utils.toArray(".s_e");
  svgItem.forEach((link) => {
    let tween = gsap
      .to(link, {
        duration: 0.4,
        scale: 1.4,
        rotation: 45,
        transformOrigin: "center center"
      })
      .reversed(true);

    link.anim = tween;
    link.addEventListener("mouseenter", () => link.anim.play());
    link.addEventListener("mouseleave", () => link.anim.reverse());
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

// ----> Text animations

function splitChar(target, delay) {
  gsap.utils.toArray(target).forEach((target) => {
    const mySplitText = new SplitText(target, { type: "words,chars" });
    TweenLite.set(target, { perspective: 400 });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: "top 60%"
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
        transformOrigin: "0% 50% -50%",
        delay: delay,
        ease: Power4.easeOut
      },
      0.05,
      "+=0"
    );
  });
}

// Split Text animation Scroll in
function splitLines(target, delay) {
  gsap.utils.toArray(target).forEach((title) => {
    const childSplit = new SplitText(title, {
      type: "lines",
      linesClass: "split-child"
    });
    const parentSplit = new SplitText(title, {
      linesClass: "split-parent"
    });

    gsap.from(childSplit.lines, {
      scrollTrigger: {
        trigger: title,
        start: "top 100%"
      },
      duration: 0.8,
      yPercent: 200,
      delay: delay,
      ease: "power4",
      stagger: 0.1
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
