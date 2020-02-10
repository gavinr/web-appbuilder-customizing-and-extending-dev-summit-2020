///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  "dojo/_base/declare",
  "jimu/BaseWidget",
  "esri/toolbars/draw"
], function(declare, BaseWidget, Draw) {
  var clazz = declare([BaseWidget], {
    baseClass: "clipsummarize",

    postCreate: function() {
      this.inherited(arguments);

      this.drawToolbar = new Draw(this.map, {
        tooltipOffset: 20,
        drawTime: 90
      });

      this.drawToolbar.on("draw-end", this.drawEndHandler.bind(this));
    },

    startDrawClickHandler: function() {
      console.log("start draw!");
      this.drawToolbar.activate(Draw.POLYGON);
    },

    drawEndHandler: function(event) {
      console.log("drawEnd", event);
      this.drawToolbar.deactivate();
    }
  });
  return clazz;
});
