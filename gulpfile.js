const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const sourcemaps = require('gulp-sourcemaps')
const scss = require('gulp-sass')(require('sass'))
//const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const image = require('gulp-imagemin')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const include = require('gulp-file-include')
const gulpif = require('gulp-if')
//const prod = require('yargs').argv
const del = require('del')
const fileinclude = require('gulp-file-include')
const browserSync = require('browser-sync').create()

let prod = false;

const isProd = (done) => {
    prod = true;
    done();
}

const clean = () => {
    return del(['dist'])
}

const styles = () => {
    return src('src/scss/*.scss')
    .pipe(scss())
        // .pipe(sass().on('error', notify.onError))
        .pipe(concat('main.css'))
        .pipe(gulpif(!prod, sourcemaps.init()))
        
        // .pipe(autoprefixer({
        //     cascade: false,
        //     grid: true,
        //     overrideBrowserslist: ["last 5 versions"]
        // }))
        .pipe(gulpif(prod, cleanCSS({
            level: 2
        })))
        .pipe(gulpif(!prod, sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/*.html')
        .pipe(gulpif(prod, htmlmin({
            collapseWhitespace: true,
        })))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const components = () => {
    return src(['src/components/catalog.html', 'src/components/card.html', 'src/components/partnership.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src('src/script/*.js')
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(gulpif(prod, uglify().on('error', notify.onError())))
        .pipe(gulpif(!prod, sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const pagesScripts = () => {
    return src('src/pagesScripts/*.js')
        .pipe(include())
        .pipe(dest('dist/pagesScripts'))
        .pipe(browserSync.stream())
}

const images = () => {
    return src([
        'src/images/*.png',
        'src/images/*.jpg',
        'src/images/*.jpeg',
        'src/images/*.svg',
    ])
        .pipe(image())
        .pipe(dest('dist/images'))
}

const fonts = () => {
    return src('src/fonts/**/*')
        .pipe(dest('dist/fonts'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

watch(['src/**/*.html'], htmlmin)
watch(['src/styles/**/*.scss'], styles)
watch(['src/script/*.js'], scripts)
watch(['src/components/*.html'], components)
watch(['src/pagesScripts/*.js'], pagesScripts)


exports.styles = styles
exports.pagesScripts = pagesScripts
//exports.components = components
exports.htmlMinify = htmlMinify
exports.scripts = scripts

exports.dev = series(clean, htmlMinify, styles, scripts, images, fonts, pagesScripts, components, watchFiles)
exports.build = series(isProd, clean, htmlMinify, styles, scripts, images, fonts, pagesScripts, components)
