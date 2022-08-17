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
   document.querySelector(".navigationbar_two").style.top = "-80px";
    
  } else {
    
   document.querySelector(".navigationbar").style.top = "-80px";
 document.querySelector(".navigationbar_two").style.top = "0";
  }
}


/////////// ICON BUTTONS ON EJS \\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//

const upvoteQuestion = document.querySelectorAll('.likeIcon')
const downvoteQuestion = document.querySelectorAll('.dislikeIcon')
const replyQuestion = document.querySelectorAll('.fa-comment')
const deleteQuestion = document.querySelectorAll('.fa-trash')

Array.from(upvoteQuestion).forEach((element) =>{
  element.addEventListener('click', addLike)
})

Array.from(downvoteQuestion).forEach((element) =>{
  element.addEventListener('click', disLike)
})

Array.from(deleteQuestion).forEach((element) =>{
  element.addEventListener('click', deleteQuestionAdded)
})






async function addLike(){
  const qTitle = this.parentNode.childNodes[1].innerText
  const qSummary = this.parentNode.childNodes[3].innerText
  const qLikes = Number(this.parentNode.childNodes[5].innerText)
  try{
    const res = await fetch('addOneLike', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
       'questionHeaderS' : qTitle,
       'questionBodyS': qSummary,
        'likesS': qLikes
      })
    })
    const data = await res.json()
    console.log(data)
   location.reload()
  } catch(err) {
    console.log(err)
  }
}


async function deleteQuestionAdded(){
  const qTitle = this.parentNode.childNodes[1].innerText
  const qSummary = this.parentNode.childNodes[3].innerText
  try{
    const res = await fetch('deleteQuestionAdded', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'questionHeaderS' : qTitle,
      'questionBodyS': qSummary,
      
    })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }
  catch(err){
    console.log(err)
  }
}

async function disLike(){

  const qTitle = this.parentNode.childNodes[1].innerText
  const qSummary = this.parentNode.childNodes[3].innerText
  const qdisLikes = Number(this.parentNode.childNodes[7].innerText)
  try{
    const res = await fetch('addOnedislike', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'questionHeaderS' : qTitle,
        'questionBodyS': qSummary,
        'dislikesS': qdisLikes
      })
    })
    const data = await res.json()
    console.log(data)
   location.reload()
  }catch(err){
    console.log(err)
  }
}






