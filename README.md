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

Add to your root js component:

```js
import 'semantic-ui-less/definitions/globals/reset.less';
import 'semantic-ui-less/definitions/globals/site.less';
```

Add loaders for semantic-ui-less modules and it's assets in your webpack config:

```js
module: {
  loaders: [

    // less-loader
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?!postcss!semantic-ui-less-module'),
      include: [/[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
    },

    // loader for static assets
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'url?limit=10240&absolute&name=images/[path][name]-[hash:7].[ext]',
      include: [/[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
    },
    {
      test: /\.(woff|woff2|ttf|svg|eot)$/,
      loader: 'url?limit=10240&name=fonts/[name]-[hash:7].[ext]',
      include: [/[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
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

#### To fix https://github.com/Semantic-Org/Semantic-UI-LESS/issues/14

Add to your site/globals/site.variables:

```less

@imagePath : '../assets/images';
@fontPath  : '../assets/fonts';

```