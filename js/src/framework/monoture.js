class Monoture {
  static register(manifest, plugin) {
    $.fn[manifest.method] = function(options) {
      return this.each(function(){
        let hook  = $(this).data(manifest.hook);

        if (!hook) {
          hook = new plugin($(this), options);
        }

        if (typeof options == 'string' && typeof hook[options] == 'function') {
          hook[options]();
        }
      });
    }
  }

  static dataBind(selector, manifest) {
    $(selector).each(function(){
      $(this)[manifest.method]($(this).data());
    });
  }
}

module.exports = Monoture;

// return this.each(function() {
//   let $this = $(this);
//   let namespace = namespace;
//   let data = $this.data(namespace);
//
//   let _config = $.extend(
//     {},
//     defaultConfig,
//     $(this).data(),
//     typeof config === 'object' && config
//   );
//
//   if (!data) {
//     data = new plugin(this, _config);
//   }
//
//   console.log(namespace);
//
//   if (typeof config == 'string' && typeof data[config] == 'function') {
//       data[config]();
//   }
// });
