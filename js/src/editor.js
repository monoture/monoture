var $ = require('jquery');
var markdown = require('markdown').markdown;

module.exports = $(function(){

  $(document).on('change, keyup', '[data-spy="markdown"]', function(){
    var $target = $($(this).data('target'));
    $target.html(markdown.toHTML($(this).val()));
  });

  $('[data-spy="markdown"]').trigger('keyup');

  $(document).on('click', '[data-spy="markdown-list"]', function(e){

    e.preventDefault();

    $('[data-spy="markdown-list"] .fa-chevron-right').hide();
    $(this).find('.fa-chevron-right').show();

    var $target = $($(this).data('target'));
    var post = $(this).data('post');

    $.get('/monoture/post/' + post + '.json', function(post){
      $target.html('<h1>' + post.title + '</h1>' + markdown.toHTML(post.body));
      $('#post-edit').prop('href', '/monoture/post/' + post._id);
      $('#post-publish').prop('href', '/monoture/post/' + post._id + '/publish');
      $('#post-view').prop('href', '/post/' + post.slug);
      $('#post-delete').prop('href', '/monoture/post/' + post._id + '/delete');

      if (post.published) {
        $('#post-publish').html('<i class="fa fa-globe"></i>Unpublish');
      } else {
        $('#post-publish').html('<i class="fa fa-globe"></i>Publish');
      }
    });
  });

  $('[data-spy="markdown-list"]').eq(0).trigger('click');
});
