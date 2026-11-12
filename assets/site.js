// greenvent.vn — menu di động, hiện dần khi cuộn, form liên hệ mở email
(function () {
  var burger = document.querySelector('.hdr__burger'), nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var form = document.getElementById('cform');
  if (form) {
    var loai = new URLSearchParams(location.search).get('loai');
    if (loai && form.topic && form.topic.querySelector('option[value="' + loai + '"]')) form.topic.value = loai;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = new FormData(form);
      var sel = form.topic.options[form.topic.selectedIndex].text;
      var lines = [d.get('name'), d.get('company'), d.get('phone'), d.get('city')].filter(function (x) { return x; });
      var body = lines.concat(['', d.get('message')]).join('\n');
      location.href = 'mailto:' + form.dataset.to +
        '?subject=' + encodeURIComponent(form.dataset.subject + ' — ' + sel) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
