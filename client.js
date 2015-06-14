var connection = new WebSocket('ws://push-it-real-good.herokuapp.com', ['soap', 'xmpp']);

connection.onopen = function () {
  send('2sdali5 3bf9e1b3-848f-4ba9-bba9-224ba81e3e15');//document.body.getAttribute("data-auth-token")); //getCookie('ID'));
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
