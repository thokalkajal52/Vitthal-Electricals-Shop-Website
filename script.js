// English / Marathi toggle: English text is read from the page, Marathi from data-mr
var mr = false, nodes = document.querySelectorAll('[data-mr]');
nodes.forEach(function(el){ el.dataset.en = el.textContent; });
document.getElementById('yr').textContent = '© ' + new Date().getFullYear();
document.getElementById('langBtn').onclick = function(){
  mr = !mr;
  nodes.forEach(function(el){ el.textContent = mr ? el.dataset.mr : el.dataset.en; });
  document.documentElement.lang = mr ? 'mr' : 'en';
  this.textContent = mr ? 'English' : 'मराठी';
};
// Light fade-in as sections and cards scroll into view
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold: 0.12});
  document.querySelectorAll('.svc,.why li,.step,.ph,.info,form,.about .wrap > div').forEach(function(el){
    el.classList.add('fade'); io.observe(el);
  });
}
// Review form: star rating, then opens WhatsApp with the feedback
var GOOGLE_REVIEW_URL = ''; // paste your Google Business Profile review link here
if (GOOGLE_REVIEW_URL) { var g = document.getElementById('gbtn'); g.href = GOOGLE_REVIEW_URL; g.hidden = false; }
var rating = 0, starBtns = document.querySelectorAll('.star');
starBtns.forEach(function(b){
  b.onclick = function(){
    rating = +b.dataset.v;
    starBtns.forEach(function(x){ var on = +x.dataset.v <= rating; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    document.getElementById('rmsg').textContent = '';
  };
});
document.getElementById('rev').onsubmit = function(e){
  e.preventDefault();
  if (!rating) { document.getElementById('rmsg').textContent = mr ? 'कृपया रेटिंग निवडा.' : 'Please choose a star rating.'; return; }
  var t = 'Review for Vitthal Electricals\nRating: ' + rating + '/5 ' + '\u2605'.repeat(rating) +
          '\nName: ' + rn.value + (rv.value ? '\nVillage: ' + rv.value : '') + '\nFeedback: ' + rm.value;
  window.open('https://wa.me/919172896200?text=' + encodeURIComponent(t), '_blank');
};
// Enquiry form opens WhatsApp with a pre-filled message
document.getElementById('enq').onsubmit = function(e){
  e.preventDefault();
  var t = 'Hello Vitthal Electricals,\nName: ' + n.value + '\nVillage: ' + v.value + '\nProblem: ' + p.value;
  window.open('https://wa.me/919172896200?text=' + encodeURIComponent(t), '_blank');
};
