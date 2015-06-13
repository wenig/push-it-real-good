var connection = new WebSocket('ws://push-it-real-good.herokuapp.com', ['soap', 'xmpp']);

connection.onopen = function () {
  send(document.body.getAttribute("data-auth-token")); //getCookie('ID'));
};

connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

connection.onmessage = function (e) {
  alert(e.data);
};

function send(msg){
  connection.send(msg);
}
