'use strisct'

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', async function (){
   gulp.src('./css/*.scss')
       .pipe(sass().on('Error', sass.logError))
       .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', async function() {
   gulp.watch('./css/*.scss', gulp.series('sass'))
});


gulp.task('browser-sync', async function (){
   let files = ['./*.html', './css/*.css', './img/*.{png,jpg,gif,svg,jpeg}', './js/*.js']
   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

gulp.task('default', gulp.parallel('browser-sync', 'sass:watch'));


gulp.task('clean', async function (){
   return del(['dist']);
});


gulp.task('imagemin', async function (){
   return gulp.src('./images/*.{png,jpg,gif,jpeg,svg}')
       .pipe(imagemin({optmizationLevel: 3, progressive: true, interlaced: true}))
       .pipe(gulp.dest('production/images'));
});


gulp.task('copyfonts', async function (){
   gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,eof,svg,eot,otf,woff2}')
       .pipe(gulp.dest('production/fonts'));
    gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf,woff2}')
        .pipe(gulp.dest('production/fonts'));
});


gulp.task('usemin', async function (){
   return gulp.src('./*.html')
       .pipe(flatmap(function (stream, file){
          return stream
              .pipe(usemin({
                 css: [rev()],
                 html: [function (){ return htmlmin({collapseWhitespace: true})}],
                 js: [uglify(), rev()],
                 inlinejs: [uglify()],
                 inlinecss: [cleanCss(), 'concat']
              }));
       }))
       .pipe(gulp.dest('production/'));
});


gulp.task('build', gulp.series('clean','copyfonts','imagemin','usemin'));




