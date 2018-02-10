/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
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
  const {extract = true, usePostCSS = true, browsers = []} = options
  const cssLoader = getLoader('css', options)
  const postcssLoader = getLoader('postcss', options)
  
  const generateLoaders = (loaderName, loaderOptions = {}) => {
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
    postcss: generateLoaders(null, {
      'plugins': [
        autoprefixer({browsers}),
      ],
    }),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  }
}

export const vueLoader =  (options = {}) => {
  const {
    sourceMap = false, extract = true, cacheBusting = false, esModule = true, babel,
    usePostCSS = true, browsers = [],
  } = options
  return {
    loaders: {
      ...cssLoaders({
        sourceMap,
        usePostCSS,
        extract,
        browsers,
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

export const styleLoader = (options = {}) => {
  const output = []
  const loaders = cssLoaders(options)

  for(const extension in loaders){
    const loader = loaders[extension]
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    })
  }
  return output
}
