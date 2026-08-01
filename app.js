const parcel=document.querySelector('#parcel');
const pickup=document.querySelector('#pickup');
const arm=document.querySelector('#arm');
const stage=document.querySelector('.stage');
const delay=document.querySelector('#delay');
const status=document.querySelector('#status');
const verdict=document.querySelector('#verdict');
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let run=0;

function geometry(){
  const stageBox=stage.getBoundingClientRect();
  const parcelBox=parcel.getBoundingClientRect();
  const target=pickup.getBoundingClientRect().left+pickup.offsetWidth/2-stageBox.left;
  const start=parcelBox.left-stageBox.left+parcelBox.width/2;
  return {afterPickup:Math.min(stageBox.width-parcelBox.width/2-18,target+92)-start};
}

async function replay(){
  const id=++run;
  const live=()=>id===run;
  const path=geometry();
  parcel.style.transition='none';
  parcel.style.transform='translate(0,0)';
  arm.style.transition='none';
  arm.style.transform='translateX(-50%) translateY(0)';
  arm.classList.remove('closed');
  delay.textContent='0 ms';
  status.textContent='REPLAYING MOVING TASK';
  status.style.background='#223140';
  verdict.classList.remove('show');
  await wait(650); if(!live())return;

  parcel.style.transition='transform 2.35s linear';
  parcel.style.transform=`translateX(${path.afterPickup}px)`;
  await wait(1320); if(!live())return;
  delay.textContent='180 ms';
  status.textContent='DECISION ARRIVES 180 MS LATE';
  status.style.background='#725014';
  await wait(360); if(!live())return;

  arm.style.transition='transform .28s ease-out';
  arm.style.transform='translateX(-50%) translateY(16px)';
  await wait(260); if(!live())return;
  arm.classList.add('closed');
  status.textContent='GRIPPER CLOSES — PACKAGE HAS PASSED';
  status.style.background='#8a3029';
  await wait(650); if(!live())return;

  verdict.classList.add('show');
  status.textContent='MOVING TASK: FAILED';
  await wait(2600); if(live())replay();
}

let resizeTimer;
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(replay,150)});
replay();
