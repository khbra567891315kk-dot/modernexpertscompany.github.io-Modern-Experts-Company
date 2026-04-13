// تأثير ضوء يتبع مؤشر الماوس فوق البطاقات
(function(){
  const cards = document.querySelectorAll('.fx');
  function setPos(e){
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left; // موضع داخل العنصر
    this.style.setProperty('--mx', x + 'px');
  }
  cards.forEach(c => {
    c.addEventListener('mousemove', setPos);
  });
})();

