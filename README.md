# semantic-ui-less-module-loader

Webpack loader for semantic-ui-less modules
Can be used with [semantic-ui-react-less-loader](https://github.com/gadyonysh/semantic-ui-react-less-loader).

## Usage

### Installation

```js
npm install semantic-ui-react semantic-ui-less --save-dev
npm install semantic-ui-less-module-loader --only=dev
```

### Configuration

Add to your root js component:

```js
import 'semantic-ui-less/definitions/globals/reset.less';
import 'semantic-ui-less/definitions/globals/site.less';
```

Add loaders for semantic-ui-less modules and it's assets in your webpack config:

#### For webpack v.1
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

#### For webpack v.2

```js

module: {
      rules: [

        // for .less files:
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'less-loader' }
            ]
          }),
          exclude: [/[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
        },

        // for semantic-ui-less files:
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              {
                loader: 'semantic-ui-less-module-loader',
                // you can also add specific options:
                options: { siteFolder: path.join(__dirname, 'src/site') }
              }
            ]
          }),
          include: [/[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
        },

        // loader for static assets
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10240,
              absolute: true,
              name: 'images/[path][name]-[hash:7].[ext]'
            }
          },
          include: [path.join(__dirname, 'src'), /[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
        }, {
          test: /\.(woff|woff2|ttf|svg|eot)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'fonts/[name]-[hash:7].[ext]'
            }
          },
          include: [path.join(__dirname, 'src'), /[\/\\]node_modules[\/\\]semantic-ui-less[\/\\]/]
        }
      ]
    }
```

### Loader options

- defaultFolder (default: /path/to/node_modules/semantic-ui-less)
- siteFolder (default: ${defaultFolder}/_site)
- definitionsFolder (default: ${defaultFolder}/definitions)
- themesFolder (default: ${defaultFolder}/themes)
- themeConfigPath (default: ${defaultFolder}/theme.config.example)
- themePath (default: ${defaultFolder}/theme.less)

#### To fix flag @spritePath in default theme:

Add to your site/elements/flag.variables:

```less

@spritePath: "../../themes/default/assets/images/flags.png";

```

#### To fix https://github.com/Semantic-Org/Semantic-UI-LESS/issues/14

Add to your site/globals/site.variables:

```less

@imagePath : '../assets/images';
@fontPath  : '../assets/fonts';

```
