define([
  "esri/tasks/query",
  "esri/graphic",
  "esri/geometry/geometryEngine"
], function(Query, Graphic, geometryEngine) {
  return {
    /**
     * Queries the feature layer and clips the intersecting results to the geometry.
     * @param {geometry} geometry
     * @param {FeatureLayer} featureLayer
     */
    queryAndClip: function(geometry, featureLayer) {
      return new Promise((resolve, reject) => {
        var query = new Query();
        query.geometry = geometry;
        query.outFields = ["*"];

        featureLayer.queryFeatures(query).then(
          results => {
            // Intersect all the features with the drawn boundary
            var intersectedGeometries = geometryEngine.intersect(
              results.features.map(feature => {
                return feature.geometry;
              }),
              geometry
            );

            // Build up graphics for each of the drawn boundaries
            // (cannot just modify originals because we want to support the
            // reset/re-draw workflow)
            var intersectedGraphics = intersectedGeometries.map(
              (geometry, i) => {
                return new Graphic(
                  geometry,
                  null,
                  results.features[i].attributes
                );
              }
            );
            resolve(intersectedGraphics);
          },
          err => {
            reject(err);
          }
        );
      });
    },

    /**
     * Given the attribute column, will create multi-part polygons
     * @param {array} graphicsArray
     * @param {string} attributeColumnName
     */
    dissolve: function(graphicsArray, attributeColumnName) {
      console.log("dissolve", graphicsArray, attributeColumnName);
      var newFeaturesDict = {};

      graphicsArray.forEach(feature => {
        var dissolveValue = feature.attributes[attributeColumnName];

        if (dissolveValue in newFeaturesDict) {
          newFeaturesDict[dissolveValue].geometry = geometryEngine.union([
            newFeaturesDict[dissolveValue].geometry,
            feature.geometry
          ]);
        } else {
          newFeaturesDict[dissolveValue] = feature;
        }
      });

      var retFeatures = [];
      for (key in newFeaturesDict) {
        retFeatures.push(newFeaturesDict[key]);
      }
      graphicsArray = retFeatures;
      return graphicsArray;
    }
  };
});
