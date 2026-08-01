const parcel=document.querySelector('#parcel');
const robot=document.querySelector('#robot-motion');
const fingers=document.querySelector('#fingers');
const delay=document.querySelector('#delay');
const status=document.querySelector('#status');
const verdict=document.querySelector('#verdict');
const stage=document.querySelector('.stage');
const pickup=document.querySelector('.pickup-line');
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

function travelToPickup(extra=0){
  const box=parcel.getBoundingClientRect();
  const mark=pickup.getBoundingClientRect();
  return mark.left-(box.left+box.width/2)+extra;
}

async function replay(){
  parcel.style.transition='none';
  parcel.style.transform='translate(0,0) rotate(0)';
  robot.style.transition='none';
  robot.style.transform='translateY(0)';
  fingers.classList.remove('closed');
  delay.textContent='0 ms';
  status.textContent='REPLAYING COMPLETE TASK';
  status.style.background='#223140';
  verdict.classList.remove('show');
  await wait(700);

  const passedPickup=travelToPickup(64);
  parcel.style.transition='transform 2.4s linear';
  parcel.style.transform=`translateX(${passedPickup}px)`;
  await wait(1850);

  delay.textContent='180 ms';
  status.textContent='COMMAND ARRIVES 180 ms LATE';
  status.style.background='#725014';

  robot.style.transition='transform .5s ease-in-out';
  robot.style.transform='translateY(14px)';
  await wait(450);

  fingers.classList.add('closed');
  status.textContent='GRIPPER CLOSES AT EMPTY PICKUP POINT';
  status.style.background='#8a3029';
  await wait(850);

  const beltEnd=stage.clientWidth-parcel.offsetLeft-parcel.offsetWidth+28;
  parcel.style.transition='transform 1.15s linear';
  parcel.style.transform=`translateX(${beltEnd}px)`;
  await wait(1150);

  parcel.style.transition='transform .65s ease-in';
  parcel.style.transform=`translate(${beltEnd}px,145px) rotate(35deg)`;
  status.textContent='PICKUP MISSED · TASK FAILED';
  verdict.classList.add('show');
  await wait(2800);
  replay();
}

replay();
