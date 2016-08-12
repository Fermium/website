var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer');
var cp           = require('child_process');
var less         = require('gulp-less');
var path         = require('path');
var Promise      = require('es6-promise').Promise;
var imagemin     = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var clean        = require('gulp-clean');
var changed      = require('gulp-changed');
var uglify       = require('gulp-uglify');
var pump         = require('pump');
var cssnano      = require('gulp-cssnano');

// Launch jekyll for a standard build
gulp.task('jekyll-build', function (cb) {
   var build = require('child_process').spawn('jekyll', ['build'], {stdio: 'inherit'});
   build.on('exit', cb);
});

// Rebuild jekyll (using the dependency "jekyll-build" and refresh browserSync
gulp.task('jekyll-rebuild', ['build'], function () {
    browserSync.reload();
});

// Clean content of _site dir
gulp.task('clean', function () {
    return gulp.src('_site', {read: false})
        .pipe(clean());
});

// Minify the css
gulp.task('css-postprocess',['css-build'], function() {
   return gulp.src('_site/Assets/css/**/*.css')
       .pipe(changed('_site/Assets/css/**/*.css'))
       .pipe(autoprefixer())
       .pipe(cssnano())
       .pipe(minifyCss({keepBreaks: false}))
       .pipe(gulp.dest('_site/Assets/css/'));
});

// Copy and compress css
gulp.task('compress-js', ['jekyll-build'], function (cb) {
  pump([
        gulp.src('Assets/js/**/*.js'),
        uglify(),
        gulp.dest('_site/Assets/js')
    ],
    cb
  );
});



// Wait for build, then launch the browsersync server
gulp.task('browser-sync', ['build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});


// Build sass to css and inject it in the already existing _site dir
gulp.task('sass',['jekyll-build'], function () {
    return gulp.src('Assets/sass/**/*.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/Assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('_site/Assets/css'));
});

// Build less to css and inject it in the already existing _site dir
gulp.task('less',['jekyll-build'], function () {
  return gulp.src('Assets/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('_site/Assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

// Watch for changes and re-run related tasks
// Needs a few fixes
gulp.task('watch', function () {
    gulp.watch(['./**/*.less','./**/*.scss','./**/*.html','./**/*.md','./**/*.yml'], ['jekyll-rebuild']);
});

// Build sass and less
gulp.task('css-build', ['sass', 'less']);
// Optimize css (build sass, less, launch autoprefixer, miniify)
gulp.task('css-optimize', ['css-build', 'css-postprocess']);

// Build css, site with jekyll, improve css with autoprefixer
gulp.task('build', ['jekyll-build', 'css-optimize', 'compress-js']);

// Build launch browsersync and watch for changes
gulp.task('default', ['browser-sync', 'watch']);

// Build for deploy, with minification and (boring) image optimizations
gulp.task('build-deploy', ['build', 'optimize-images']);
