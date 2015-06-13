var connection = new WebSocket('ws://localhost:8001', ['soap', 'xmpp']);

connection.onopen = function () {
  send(document.body.getAttribute("data-auth-token")); //getCookie('ID'));
};

connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

connection.onmessage = function (e) {
  alert(e.data);
};

function send(msg = ""){
  connection.send(msg);
}
