document.addEventListener("DOMContentLoaded", function (event) {

  // sidebar mobile
  const blurBackground = function () {
    document.querySelector(".sidebar").style.boxShadow =
      "0px 0px 20px 5000px #00000094";
    document.querySelector(".container").style.pointerEvents = "none";
    document.querySelector(".mobile-header").style.pointerEvents = "none";
    document.querySelector(".mobile-nav-bar").style.pointerEvents = "none";
  };
  const removeBlurBackground = function () {
    document.querySelector(".sidebar").style.boxShadow = "none";
    document.querySelector(".container").style.pointerEvents = "auto";
    document.querySelector(".mobile-header").style.pointerEvents = "auto";
    document.querySelector(".mobile-nav-bar").style.pointerEvents = "auto";
  };

  // sidebar open
  document
    .querySelector(".mobile-header .me-icon")
    .addEventListener("click", function () {
      const sidebar = document.querySelector(".sidebar");
      sidebar.style.left = 0;
      sidebar.style.top = 0;

      // blur background
      blurBackground();
    });

  //sidebar close
  document
    .querySelector(".container-wrap")
    .addEventListener("click", function () {
      const sidebar = document.querySelector(".sidebar");
      sidebar.style.left = "";
      sidebar.style.top = "";

      // unblur background
      removeBlurBackground();
    });

  document.querySelector(".sidebar").addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    false
  );

  document.querySelector(".sidebar .down").addEventListener("click", function () {
    this.classList.toggle("rotate-arrow");
  });

  document.querySelector(".expand-add-acc")
    .addEventListener("click", function () {
      document.querySelector(".all-uls").classList.toggle("show-add-acc");
    });




  //on scroll hide header and bottom nav bar in mobile view
  let scroll = 1;
  let scrolldown = 1;
  window.onscroll = function (e) {
    if (this.oldScroll > this.scrollY) {
      scroll++;
      scrolldown = 1;
      if (scroll > 20 || window.pageYOffset < 60) {
        //   scrolling down
        document.querySelector(".mobile-header").style.top = "0";
        document.querySelector(".mobile-nav-bar").style.bottom = "0";
        scroll = 1;
      }
    } else {
      //   scrolling up
      scrolldown++;
      scroll = 1;
      if (scrolldown > 20 && window.pageYOffset > 60) {
        document.querySelector(".mobile-header").style.top = "-52px";
        document.querySelector(".mobile-nav-bar").style.bottom = "-55px";
        scrolldown = 1;
      }
    }
    this.oldScroll = this.scrollY;
  };



  //Scroll Suggestions
  const next_btn = document.querySelector(".next");
  const previous_btn = document.querySelector(".previous");

  const wrapper = document.querySelector(".suggestions-list");

  let scrollMovePoint = 0;
  const max_scroll = wrapper.scrollWidth;

  function test(event) {
    let operand = 300;

    // Calculate the number to move.
    if (event.target.classList.contains("next")) {
      if (scrollMovePoint < max_scroll) {
        scrollMovePoint = scrollMovePoint + operand;
      }
    } else if (event.target.classList.contains("previous")) {
      if (0 < scrollMovePoint) {
        scrollMovePoint = scrollMovePoint - operand;
      }
    }

    // Move the scroll bar to the value.
    wrapper.scroll(scrollMovePoint, 0);
  }
  next_btn.addEventListener("click", test);
  previous_btn.addEventListener("click", test);

  //Scroll Story
  const nxt_btn = document.querySelector(".nxt");
  const prev_btn = document.querySelector(".prev");

  const wrapperStory = document.querySelector(".scroll-stories");

  let scrollStoryMovePoint = 0;
  const maxStory_scroll = wrapperStory.scrollWidth;

  function testStory(event) {
    let operandStory = 300;

    // Calculate the number to move.
    if (event.target.classList.contains("nxt")) {
      if (scrollStoryMovePoint < maxStory_scroll) {
        scrollStoryMovePoint = scrollStoryMovePoint + operandStory;
      }
    } else if (event.target.classList.contains("prev")) {
      if (0 < scrollStoryMovePoint) {
        scrollStoryMovePoint = scrollStoryMovePoint - operandStory;
      }
    }

    // Move the scroll bar to the value.
    wrapperStory.scroll(scrollStoryMovePoint, 0);
  }
  nxt_btn.addEventListener("click", testStory);
  prev_btn.addEventListener("click", testStory);



  // post slider 

  var slides = document.querySelector('.post-slides-group').children;
  var nextSlide = document.querySelector(".right-slide");
  var prevSlide = document.querySelector(".left-slide");
  var counter = document.querySelector(".current-slide-indicator");
  var totalSlides = slides.length;
  var index = 0;

  var dotsHolder = document.querySelector('.post-slider-dots');

  for(let i=0; i< totalSlides; i++)
  {
    var dotC = document.createElement('div');
    dotC.setAttribute("class", "ps-dot");
    dotC.setAttribute("data-slide-id", i);
    dotsHolder.appendChild(dotC);
  }

  var slideDots = document.querySelectorAll('.ps-dot');

  nextSlide.onclick=function () {
    next("next");
  }
  prevSlide.onclick=function () {
    next("prev");
  }

  function showCounter(ci)
  {
    counter.innerHTML = ci + "/" + totalSlides;
  }
  
function next(direction){

    if(direction=="next"){

      index++;
      if( index == totalSlides)
      {
        index=0;
      }
    } 
    else
    {
      if(index==0)
      {
        index = totalSlides-1;
      }
      else
      {
        index--;
      }
    }

    for(slide of slides){
      slide.classList.remove("active-post-slide");
    }
    for (dot of slideDots) {
      dot.style.background = "#CFCECE";
    }
    showCounter(index + 1);

    slides[index].classList.add("active-post-slide");   
    slideDots[index].style.background = "#0073b1";  

  }

});