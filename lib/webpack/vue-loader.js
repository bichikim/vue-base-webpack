/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const getLoader = (loaderName, options = {}, extraOptions = {}) => {
  if(!loaderName){
    throw new Error('[getLoader] must has a loaderName')
  }
  const {sourceMap = false, ...others} = options
  return {
    loader: `${loaderName}-loader`,
    options: {
      sourceMap,
      ...others,
      ...extraOptions,
    },
  }
}

const cssLoaders = (options = {}) => {
  const {extract = true} = options
  const cssLoader = getLoader('css', options)
  const postcssLoader = getLoader('postcss', options)
  
  const generateLoaders = (loaderName, loaderOptions = {}) => {
    const {usePostCSS = true} = loaderOptions
    const loaders = usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if(loaderName){
      loaders.push(getLoader(loaderName, options, loaderOptions))
    }
    if(extract){
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      })
    }
    return ['vue-style-loader', ...loaders]
  }
  
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  }
}

export default (options = {}) => {
  const {
    sourceMap = false, extract = true, cacheBusting = false, esModule = true, babel,
  } = options
  return {
    loaders: {
      ...cssLoaders({
        sourceMap,
        extract,
      }),
      ...babel ? {
        js: {
          loader: 'babel-loader',
          options: babel,
        },
      } : {},
    },
    cssSourceMap: sourceMap,
    cacheBusting,
    esModule,
    transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href',
    },
  }
}
