const gulp = require('gulp'),
      sass = require('gulp-sass')(require('sass')),
      liveServer = require('live-server'),
      fs = require('fs'),
      htmlmin = require('gulp-htmlmin'),
      rename = require('gulp-rename'),
      minify = require('gulp-minify');


//objeto onde estão os caminhos
const paths = {
  css: {
    src: "assets/src/scss/*.scss", //onde escrevemos
    dist: "assets/dist/css" // onde é renderizado
  },
  html: {
    src: "index.html", //onde escrevemos
    dist: "assets/dist" // onde é renderizado
  },
  js: {
    src: "assets/src/js/*.js", //onde escrevemos
    dist: "assets/dist/js" // onde é renderizado
  }
}

// função para pegar o file html no src e jogar minificado no dist
gulp.task('html', function(){
  return gulp.src(paths.html.src)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(rename(function (path) {
    path.basename += ".min";
    path.extname = ".html";
  }))
  .pipe(gulp.dest(paths.html.dist));
});

// função para pegar o .scss no src e jogar comprimido e renomeado no dist
gulp.task('sass', function() {  
  return gulp.src(paths.css.src)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(rename(function (path) {
    path.basename += ".min";
    path.extname = ".css";
  }))
  .pipe(gulp.dest(paths.css.dist));
});

// função para pegar o js no src e jogar minificado e renomeado no dist
gulp.task("scripts", function(){
  return gulp.src(paths.js.src)
  .pipe(minify())
  .pipe(gulp.dest(paths.js.dist));
});

//função que fica assistindo as outras tasks em parelelo
gulp.task('watch', gulp.series(function(){
  gulp.watch(paths.html.src, gulp.parallel( ["html"] ));
  gulp.watch(paths.css.src, gulp.parallel( ["sass"] ));
  gulp.watch(paths.js.src, gulp.parallel( ["scripts"] ));
}));

//parametros do live-server
var params = {
  port: 3000,
  open: true,
  file: paths.html.src,
  wait: 1000,
  logLevel: 2
};

fs.unlink('assets/dist/js/index.js', function (err){
 try {
   if (err) throw err;
   liveServer.start(params);
  } catch (error) {
    console.log("Não foi possível encontrar o arquivo :(((")
    liveServer.start(params);
  }
})

console.log('Arquivo desnecessário deletado! :)))');