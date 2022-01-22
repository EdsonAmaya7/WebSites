//compilar  scss a css
const {src,dest,watch,parallel} = require('gulp');

const sass =require('gulp-sass')(require('sass'));

//mostrar errores de gulp sin detener la ejecucion
const plumber = require('gulp-plumber');

//imagenes
const webp = require('gulp-webp');
//aligerar imagenes jpg
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//imgaenes avif
const avif = require('gulp-avif');

function css(callback){
    src('src/scss/**/*.scss').pipe(plumber()).pipe(sass()).pipe(dest('build/css'))

    callback();
}

function watcher(callback){
    watch('src/scss/**/*.scss',css);
    callback()
}

function imagenesWebp(done){
    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

function imagenes(done){
    const opciones ={
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}

function imagenesAvif(done){
    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.imagenesWebp = imagenesWebp;
exports.imagenesAvif = imagenesAvif;
exports.watch = watcher;
exports.watcher = parallel(imagenes,imagenesWebp, imagenesAvif,watcher);