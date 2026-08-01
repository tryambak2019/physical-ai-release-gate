const parcel=document.querySelector('#parcel');const ghost=document.querySelector('#ghost');const arm=document.querySelector('#arm');const delay=document.querySelector('#delay');const status=document.querySelector('#status');const verdict=document.querySelector('#verdict');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function replay(){parcel.style.transition='none';arm.style.transition='none';ghost.style.transition='none';parcel.style.transform='translate(0,0) rotate(0)';arm.style.transform='rotate(0)';ghost.style.opacity='0';delay.textContent='0 ms';status.textContent='REPLAYING SAME TASK';status.style.background='#223140';verdict.classList.remove('show');await wait(600);
parcel.style.transition='transform 2.2s linear';parcel.style.transform='translateX(320px)';await wait(950);ghost.style.opacity='1';delay.textContent='180 ms';status.textContent='ACTING ON OLD POSITION';status.style.background='#725014';await wait(500);
arm.style.transition='transform .65s ease-in-out';arm.style.transform='rotate(-20deg)';await wait(580);status.textContent='GRIPPER CLOSES — MISSED';status.style.background='#8a3029';await wait(420);
parcel.style.transition='transform .55s ease-in';parcel.style.transform='translate(390px,120px) rotate(38deg)';status.textContent='PACKAGE STRUCK + DROPPED';verdict.classList.add('show');await wait(2600);replay()}
replay();
