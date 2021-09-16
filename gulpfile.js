const gulp = require('gulp');
const { watch } = require('gulp');

const sass = require("gulp-sass")(require("node-sass"));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const minify = require('gulp-minify');

//objeto para minificação do CSS
const paths = {
  css: {
    src: "assets/src/scss/**/*.scss", //onde escrevemos
    dist: "assets/dist/css" // onde é renderizado
  },
  js: {
    src: "assets/src/js/**/*.js",
    dist: "assets/dist/js"
  }
}

//função que minifica o css
gulp.task("sass", gulp.series(function(){
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })) // usada pra comprimir o sass
    .pipe(rename(function(path) {
      path.basename += ".min"; // depois de comprimido adiciona o .min
      path.extname = ".css" //  e adiciona o .css
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css.dist));
}))

//objeto para minificação do JS
gulp.task("scripts", gulp.series(function(){
  return gulp.src(paths.js.src)
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest(paths.js.dist));
}));

//função Watch que assiste as alterações
gulp.task('watch', gulp.series(function(){
  gulp.watch(paths.css.src, gulp.parallel( ["sass"] ));
  gulp.watch(paths.js.src, gulp.parallel( ["scripts"] ));
}));

//função principal de tarefas
gulp.task('default', gulp.series(['sass', "scripts"]));