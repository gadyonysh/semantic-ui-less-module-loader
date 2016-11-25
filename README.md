# semantic-ui-less-module-loader

Webpack loader for semantic-ui-less modules
Can be used with [semantic-ui-react-less-loader](https://github.com/gadyonysh/semantic-ui-react-less-loader).

## Usage

### Installation

```js
npm install semantic-ui-react semantic-ui-less --save-dev
npm install semantic-ui-less-module-loader --dev
```

### Configuration

Add loader for semantic-ui-less modules in your webpack config:

```js
module: {
  loaders: [
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?!postcss!semantic-ui-less-module'),
      include: [/node_modules[\/\\]semantic-ui-less/]
    }
  ]
},

// you can also add specific options:
semanticUiLessModuleLoader: {
  siteFolder: path.join(__dirname, 'src/site'),
},  
  
```

### Loader options

- defaultFolder (default: /path/to/node_modules/semantic-ui-less)
- siteFolder (default: ${defaultFolder}/_site)
- definitionsFolder (default: ${defaultFolder}/definitions)
- themesFolder (default: ${defaultFolder}/themes)
- themeConfigPath (default: ${defaultFolder}/theme.config.example)
- themePath (default: ${defaultFolder}/theme.less)