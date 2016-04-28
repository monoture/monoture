$(function(){
  var $title = $('input[name="title"]');
  var $text = $('textarea');
  var $preview = $('#preview');

  function update($text, $preview) {
    $preview.html('<h1>' + $title.val() + '</h1>' + markdown.toHTML($text.val()));
  }

  update($text, $preview);

  $text.on('change, keyup', function(){
    update($(this), $preview);
  })
});
