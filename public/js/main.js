/////////// PAGE ANIMATION ON SCROLL \\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);


/*if (upvoteQuestion.classList.contains('blueviolet')){
  upvoteQuestion.classList.remove('blueviolet'); 
}
this.classList.toggle('red')

if (downvoteQuestion.classList.contains('red')) {
  downvoteQuestion.classList.remove('red');
} 
this.classList.toggle('blueviolet');*/


/////////// HIDE AND SHOW BOTH NAVIGATIONBAR ON SCROLL \\\\\\\\\\\\\\\\
window.onscroll = function() {scrollFunction()}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector(".navigationbar").style.top = "0";
   document.querySelector(".navigationbar_two").style.top = "-50px";
    
  } else {
    
  document.querySelector(".navigationbar").style.top = "-50px";
 document.querySelector(".navigationbar_two").style.top = "0";
  }
}







function showpara(){
  document.querySelector(".hidden_paragraph").style.display = "block"
}


////DROPDOWN TOGGLE COMMENT

const dropdownComment = document.querySelector("#dropdown_comment")
const dropdownTextAreaOne = document.querySelector("#dropdown_comment + div + hidden")

dropdownComment.addEventListener("click", () => {
  dropdownTextAreaOne.classList.toggle("hidden")
})