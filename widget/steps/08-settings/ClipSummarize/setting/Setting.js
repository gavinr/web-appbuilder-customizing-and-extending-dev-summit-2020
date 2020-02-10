define(["dojo/_base/declare", "jimu/BaseWidgetSetting"], function(
  declare,
  BaseWidgetSetting
) {
  return declare([BaseWidgetSetting], {
    baseClass: "jimu-widget-demo-setting",

    postCreate: function() {
      //the config object is passed in
      this.setConfig(this.config);
    },

    setConfig: function(config) {
      this.showTableCheckbox.checked = config.showTable;
    },

    getConfig: function() {
      //WAB will get config object through this method
      return {
        showTable: this.showTableCheckbox.checked
      };
    }
  });
});
