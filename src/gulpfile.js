'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var imagemin = require('gulp-imagemin');
var fontmin = require('gulp-fontmin');
var rename = require('gulp-rename');

//dispatch all the css from bower_components to static/css
gulp.task('dispatch_css', function(){
    //array of css files from bower_components
    //bower is used to update the front-end dependencies
    var css = [
        'bower_components/materialize/bin/materialize.css',
        ];
    //loop through each css file and take an action
    for(var index in css){
       gulp.src(css[index])
       .pipe(cssmin())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('./static/css'))
    } //end for
});

//gulp task to extract scripts, from bower_components and dispatch to static/js
gulp.task('dispatch_scripts', function(){
    //scripts array need to update on every bower install command
 var scripts = [ 
   'bower_components/jquery/dist/jquery.js', 
   'bower_components/materialize/bin/materialize.js'
 ];
 for(var index in scripts){
   gulp.src(scripts[index])        
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./static/js'))
 }
});

//compiling the sass scripts 
gulp.task('sass', function(){
    gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./static/css/'))
});

//compiling and minify the css 

gulp.task('css', function(){
    gulp.src('./css/**/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./static/css/'))
});

//compiling the js scripts 
gulp.task('js', function(){
    gulp.src('./js/**/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./static/js/'))
});

//compress image directory and dispatch to static/img
gulp.task('img', function(){
    gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./static/img'))
});

//watching the changes 
gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
     gulp.watch('./css/**/*.css', ['css']);
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./img/*', ['img']);
});


//default task
gulp.task('default', ['sass', 'css', 'js', 'img', 'watch']);
