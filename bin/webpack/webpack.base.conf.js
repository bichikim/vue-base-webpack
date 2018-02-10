/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import {vueLoader, styleLoader} from './loader'
import {toJSONString} from './utils'
import fs from 'fs'
import {join, posix} from 'path'
import eslintFriendlyFormatter from 'eslint-friendly-formatter'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {Config, PRODUCTION} from './Config'
import webpack from 'webpack'
export default (config, state = PRODUCTION) => {
  const {name, env, version} = config
  const {isSourceMap, isExtract} = Config
  const stateConfig = config.getStateConfig(state)
  const resolve = (...path) => {
    return join(stateConfig.paths.root, ...path)
  }
  const asset = (path) => {
    posix.join(resolve(stateConfig.paths.asset), path)
  }
  
  return {
    name,
    entry: {
      app: ['babel-polyfill', resolve(stateConfig.paths.source, stateConfig.files.indexJs)],
    },
    output: {
      path: stateConfig.paths.output,
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
    plugins: [
      new webpack.DefinePlugin({
        'process.env': toJSONString({
          ...env,
          NODE_ENV: state,
          VERSION: version,
          STORE: stateConfig.store,
        }),
      }),
      new HtmlWebpackPlugin({
        filename: stateConfig.files.indexHtml,
        template: stateConfig.files.indexTemplate,
        inject: true,
        ...stateConfig.serviceWorker ? {
          serviceWorkerLoader: `
            <script>
                ${fs.readFileSync(resolve(stateConfig.serviceWorker), 'utf-8')}
            </script>`
          ,
        } : {},
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
            babel: stateConfig.babel,
          }),
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test')],
          options: stateConfig.babel,
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
