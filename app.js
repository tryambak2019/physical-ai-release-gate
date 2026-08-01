const parcel=document.querySelector('#parcel');
const robot=document.querySelector('#robot-motion');
const fingers=document.querySelector('#fingers');
const delay=document.querySelector('#delay');
const status=document.querySelector('#status');
const verdict=document.querySelector('#verdict');
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function replay(){
  parcel.style.transition='none';
  parcel.style.transform='translate(0,0) rotate(0)';
  robot.style.transition='none';
  robot.style.transform='rotate(0deg)';
  fingers.classList.remove('closed');
  delay.textContent='0 ms';
  status.textContent='REPLAYING COMPLETE TASK';
  status.style.background='#223140';
  verdict.classList.remove('show');
  await wait(700);

  parcel.style.transition='transform 3s linear';
  parcel.style.transform='translateX(410px)';
  await wait(1350);

  delay.textContent='180 ms';
  status.textContent='COMMAND ARRIVES 180 ms LATE';
  status.style.background='#725014';
  await wait(350);

  robot.style.transition='transform .65s ease-in-out';
  robot.style.transform='rotate(-13deg)';
  await wait(600);
  fingers.classList.add('closed');
  status.textContent='GRIPPER CLOSES BEHIND PACKAGE';
  status.style.background='#8a3029';
  await wait(900);

  parcel.style.transition='transform .65s ease-in';
  parcel.style.transform='translate(470px,145px) rotate(35deg)';
  status.textContent='PICKUP MISSED · TASK FAILED';
  verdict.classList.add('show');
  await wait(2800);
  replay();
}

replay();
