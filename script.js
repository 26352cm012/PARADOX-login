const form=document.getElementById("loginForm");
const button=document.getElementById("loginButton");
const area=document.getElementById("actions");
const message=document.getElementById("message");

let attempts=0;
let lastMove=0;

const messages=["Nice try.","Too slow.","Nope.","You thought you had it.","The button is faster than you.","PARADOX.","Keep chasing."];

function moveButton(mouseX=null,mouseY=null){
  const now=performance.now();
  if(now-lastMove<45)return;
  lastMove=now;
  attempts++;

  const areaRect=area.getBoundingClientRect();
  const buttonWidth=button.offsetWidth;
  const buttonHeight=button.offsetHeight;
  const maxX=Math.max(0,area.clientWidth-buttonWidth);
  const maxY=Math.max(0,area.clientHeight-buttonHeight);

  let x=Math.random()*maxX;
  let y=Math.random()*maxY;

  if(mouseX!==null&&mouseY!==null){
    const localX=mouseX-areaRect.left;
    const localY=mouseY-areaRect.top;
    for(let i=0;i<12;i++){
      const testX=Math.random()*maxX;
      const testY=Math.random()*maxY;
      if(Math.hypot(testX+buttonWidth/2-localX,testY+buttonHeight/2-localY)>170){
        x=testX;y=testY;break;
      }
    }
  }

  button.style.left=x+"px";
  button.style.top=y+"px";
  button.style.transform="scale("+(.92+Math.random()*.08)+")";
  message.textContent=messages[Math.min(attempts-1,messages.length-1)];
  message.style.color="#999";
}

document.addEventListener("mousemove",e=>{
  const r=button.getBoundingClientRect();
  const cx=r.left+r.width/2;
  const cy=r.top+r.height/2;
  if(Math.hypot(e.clientX-cx,e.clientY-cy)<155)moveButton(e.clientX,e.clientY);
});

button.addEventListener("mouseenter",()=>moveButton());
button.addEventListener("pointerdown",e=>{e.preventDefault();moveButton(e.clientX,e.clientY)});
form.addEventListener("submit",e=>{e.preventDefault();moveButton()});
