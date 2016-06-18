var Monoture  = require('../framework/monoture');
var Component = require('../framework/component');
var markdown  = require('markdown').markdown;

const DashboardList = (($) => {

  const MANIFEST = {
    method : 'dashboardList',
    hook   : 'monoture.dashboardList'
  }

  class DashboardList extends Component {
    constructor(element, options) {
      super(element, options);

      this.target = $(element.data('target'));
      this.controls = $(element.data('controls'));
      this.post   = element.data('post');
    }

    evaluate() {

      var that = this;

      this.element.siblings().removeClass('active');
      this.element.addClass('active');

      $.get('/dashboard/post/' + this.post + '.json', function(post){
        that.target.html('<h1>' + post.title + '</h1>' + markdown.toHTML(post.body));
        that.controls.find('[data-control="edit"]').prop('href', '/dashboard/post/' + post._id);
        that.controls.find('[data-control="publish"]').prop('href', '/dashboard/post/' + post._id + '/publish');
        that.controls.find('[data-control="view"]').prop('href', '/post/' + post.slug);
        that.controls.find('[data-control="delete"]').prop('href', '/dashboard/post/' + post._id + '/delete');

        if (post.published) {
          that.controls.find('[data-control="publish"]').html('<i class="fa fa-globe"></i>Unpublish');
        } else {
          that.controls.find('[data-control="publish"]').html('<i class="fa fa-globe"></i>Publish');
        }
      });
    }
  }

  Monoture.register(MANIFEST, DashboardList);
  Monoture.dataBind('[data-spy="markdown-list"]', MANIFEST);

  // Evaluate on click
  $(document).on('click', '[data-spy="markdown-list"]', function(e){
    $(this).dashboardList('evaluate');
  });

  // Make it evaluate on page load
  $('[data-spy="markdown-list"]').eq(0).dashboardList('evaluate');

  return DashboardList;
})(jQuery)

module.exports = DashboardList;
