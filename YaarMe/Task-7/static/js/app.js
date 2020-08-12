var $ = (elem) => {
    return document.querySelector(elem)
};

var $_ = (elem) => {
    return document.querySelectorAll(elem)
};

document.addEventListener("DOMContentLoaded", () => {

    let steps = $_(".slide"),
    btnPrev = $(".btn-prev"),
    btnNext = $(".btn-next"),
    progressbar = $(".progress-bar"),
    pwidth = 16,
    smsg = $(".success"),
    currentSlide = 0;

    showslide(currentSlide);

    function showslide(n) {

        steps[n].classList.add("slide-active");
      
        if (n == 0) {

            btnPrev.classList.add("btn-hidden");
            btnPrev.classList.remove("btn-show");

        } else {
            btnPrev.classList.add("btn-show");
            btnPrev.classList.remove("btn-hidden");
        }
        if (n == steps.length - 1) {
            btnNext.textContent = "Finish";
        } else {
            btnNext.textContent = "Next";
        }

    }

    function progress(n) {

        if(n === 1 && currentSlide < steps.length - 1) {
            pwidth = currentSlide <= 3 ? pwidth + 16 : pwidth + 20;
            progressbar.style.width = pwidth + "%";
        }
        else if (n === -1) {
            pwidth = currentSlide > 4 ? pwidth - 20 : pwidth - 16;
            progressbar.style.width = pwidth + "%";
        }
    }

    function toggleSlide(n) {

        progress(n);
        steps[currentSlide].classList.remove("slide-active");
        currentSlide = currentSlide + n;

        if (!(currentSlide >= steps.length)) {
            showslide(currentSlide);
        }
        else {
            btnPrev.classList.add("btn-hidden");
            btnNext.classList.add("btn-hidden");
            $('.pp').style.display = "none";
            $('.s-h1').style.display = "none";
            $('.s-h2').style.display = "none";
            $('.rlink-txt').innerHTML = "Proceed to"
            smsg.style.display = "flex";
            return false;
        }
    }

    btnPrev.addEventListener("click", () => {
        toggleSlide(-1);
    });

    btnNext.addEventListener("click", () => {
        toggleSlide(1);
    });


});


