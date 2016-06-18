var Monoture  = require('../framework/monoture');
var Component = require('../framework/component');
var markdown  = require('markdown').markdown;

const Editor = (($) => {

  const MANIFEST = {
    method : 'editor',
    hook   : 'monoture.editor'
  }

  class Editor extends Component {
    constructor(element, options) {
      super(element, options);

      this.target = $(element.data('target'));
    }

    evaluate() {
      this.target.html(markdown.toHTML(this.element.val()));
    }
  }

  Monoture.register(MANIFEST, Editor);
  Monoture.dataBind('[data-spy="markdown"]', MANIFEST);

  // Evaluate on change and keyup
  $(document).on('change, keyup', '[data-spy="markdown"]', function(){
    $(this).editor('evaluate');
  });

  // Make it evaluate on page load
  $('[data-spy="markdown"]').editor('evaluate');

  return Editor;
})(jQuery)

module.exports = Editor;
