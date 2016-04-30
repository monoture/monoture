var $ = require('jquery');
var markdown = require('markdown').markdown;

module.exports = $(function(){

  $(document).on('change, keyup', '[data-spy="markdown"]', function(){
    var $target = $($(this).data('target'));
    var $title  = $($(this).data('title'));
    $target.html(($title.length ? '<h1>' + $title.val() + '</h1>' : '') + markdown.toHTML($(this).val()));
  });

  $('[data-spy="markdown"]').trigger('keyup');
});
