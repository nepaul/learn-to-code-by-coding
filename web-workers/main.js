var first = document.querySelector('#number1');
var second = document.querySelector('#number2');
var result = document.querySelector('#result');

if (window.Worker) {
  var myWorker = new Worker('worker.js');
  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message receive from worker');
  }
  // Terminating a worker
  // myWorker.terminate();

  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }
  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  }

}
