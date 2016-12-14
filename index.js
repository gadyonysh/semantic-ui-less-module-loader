var path = require('path');
var lessLoader = require('less-loader');
var loaderUtils = require('loader-utils');
var assign = require('lodash.assign');

var themeConfigPattern = /^\.\.\/\.\.\/theme.config$/;
var themePattern = /^\.\/theme\.less/;
var folderPattern = /^\.\/(site|definitions|themes)(?=\/)/;
var semanticUiLessRoot = path.dirname(
  require.resolve('semantic-ui-less/package.json')
);

module.exports = function (source, map)
{
  if (this.cacheable)
  {
    this.cacheable();
  }

  var config = loaderUtils.getLoaderConfig(this, 'semanticUiLessModuleLoader');

  config.defaultFolder = config.defaultFolder || semanticUiLessRoot;
  
  config = assign(
    {
      definitionsFolder: path.join(config.defaultFolder, 'definitions'),
      siteFolder: path.join(config.defaultFolder, '_site'),
      themeConfigPath: path.join(config.defaultFolder, 'theme.config.example'),
      themePath: path.join(config.defaultFolder, 'theme.less'),
      themesFolder: path.join(config.defaultFolder, 'themes')
    },
    config
  );

  var originalResolve = this.resolve;

  this.resolve = function(context, moduleRequest, callback)
  {
    moduleRequest = moduleRequest
      .replace(themeConfigPattern, function() { return config.themeConfigPath; })
      .replace(themePattern, function() { return config.themePath; })
      .replace(folderPattern, function($0, dir) { return config[dir + 'Folder']; });

    return originalResolve.call(this, context, moduleRequest, callback);
  };

  return lessLoader.call(this, source);
};