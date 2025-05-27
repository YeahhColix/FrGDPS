const api = 'https://fless.ps.fhgdps.com/dashboard/api/';

// Tab switching
document.querySelectorAll('.tab').forEach(t => {
  t.onclick = () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.content').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.tab).classList.add('active');
  };
});

// Helpers
const v = id => encodeURIComponent(document.getElementById(id).value);

// LOGIN
function doLogin() {
  fetch(api + 'login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `userName=${v('login-user')}&password=${v('login-pass')}`
  })
    .then(r => r.json())
    .then(j => renderLogin(j))
    .catch(e => document.getElementById('login-res').innerHTML = `<div class="login-card error"><p>❌ Error: ${e}</p></div>
