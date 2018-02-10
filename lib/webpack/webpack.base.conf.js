/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import {vueLoader, styleLoader} from './loader'
import {toJSONString} from './utils'
import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import {Config, PRODUCTION} from './Config'
import webpack from 'webpack'
export default (conf, options = {}, state = PRODUCTION) => {
  const config = new Config(conf)
  const {
    name, files, paths, env, version,
    getStateConfig, resolve, babel, output, asset,
  } = config
  const {isSourceMap, isExtract, isDevtool} = Config
  const stateConfig = getStateConfig(state)
  
  return {
    name,
    entry: {
      app: ['babel-polyfill', resolve(paths.source, files.index)],
    },
    output: {
      path: output(),
      publicPath: stateConfig.publicPath,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      },
    },
    devtool: isDevtool(state),
    plugins: [
      new webpack.DefinePlugin({
        'process.env': toJSONString({
          ...env,
          NODE_ENV: state,
          VERSION: version,
          STORE: options,
        }),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('src'), resolve('test')],
          options: {
            formatter: eslintFriendlyFormatter,
          },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoader({
            sourceMap: isSourceMap(state),
            extract: isExtract(state),
            cacheBusting: true,
            babel: babel(state),
          }),
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test')],
          options: babel(state),
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: asset('img/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: asset('media/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: asset('fonts/[name].[hash:7].[ext]'),
          },
        },
        ...styleLoader({
          sourceMap: isSourceMap(state),
          usePostCSS: true,
        }),
      ],
    },
  }
}
