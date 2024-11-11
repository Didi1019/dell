const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        $(entry.target).toggleClass('show', entry.isIntersecting);
    });
});

const hiddenElements = $('.details ul > li, .imageLf > *, .imageRT > *');
hiddenElements.each(function() {
    observer.observe(this);
});



// document.getElementById("cards").onmousemove = e => {
//     for(const card of document.getElementsByClassName("card")) {
//       const rect = card.getBoundingClientRect(),
//             x = e.clientX - rect.left,
//             y = e.clientY - rect.top;
  
//       card.style.setProperty("--mouse-x", `${x}px`);
//       card.style.setProperty("--mouse-y", `${y}px`);
//     };
//   }