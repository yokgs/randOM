document.body.querySelector('.error').style.display='none';
document.querySelector('.actions>#start').addEventListener('click',bridge);
document.querySelector('.actions>#share').addEventListener('click',YS.share);
document.querySelector('.actions>#star').addEventListener('click',()=>open('https://github.com/yokgs/randOM'))
