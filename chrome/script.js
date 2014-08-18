function highlight(matches) {
  $.each(matches, function(key, value) {
    var nome_completo = key;
    if (value != 0) {
      nome_completo = value;
    }
    $("p").highlight(key, {caseSensitive: false, className: 'highlight-1337', wordsOnly:true, dataAttr: nome_completo});
  });

  $('.highlight-1337').each(function() {
    var nome = $(this).attr("data-highlight");
    $(this).tooltipster({
      content : $('<table><tr><th>Loading...</th><th> </th></tr></table>'),
      
      theme: 'tooltipster-verdinha',
      
      functionBefore: function(origin, continueTooltip) {
        continueTooltip();

       $.get("http://127.0.0.1:5000/busca/"+nome, function (data) {
          origin.tooltipster('content', $(data));
        });
      }
    });
  });
}

jQuery(document).ready(function($) {
  var texto = $("p").text().toUpperCase();
  console.log('Heyho, heyho!')
  var worker = new Worker(chrome.runtime.getURL('worker.js')); //Construct worker
  worker.onmessage = function (event) { //Listen for thread messages
    highlight(event.data);           //Log to the Chrome console
    console.log('Pra casa agora eu vou!');
  };
  worker.postMessage({'texto' : texto, 'nomes' : nick}); //Start the worker with args
});