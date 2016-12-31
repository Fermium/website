var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer');
var cp           = require('child_process');
var path         = require('path');
var Promise      = require('es6-promise').Promise;
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');
var clean        = require('gulp-clean');
var changed      = require('gulp-changed');
var uglify       = require('gulp-uglify');
var pump         = require('pump');
var cssnano      = require('gulp-cssnano');
var htmlmin      = require('gulp-htmlmin');
var webserver    = require('gulp-webserver');
var shell = require('gulp-shell')


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

// Run autoprefixer to improve compatibility, then css nano with safe option to reduce size of 
gulp.task('css-optimize',['sass', 'build'], function() {
   return gulp.src('_site/Assets/css/**/*.css')
       .pipe(autoprefixer())
       .pipe(cssnano({
         safe: true
       }))
       //.pipe(minifyCss({keepBreaks: true}))
       .pipe(gulp.dest('_site/Assets/css/'))
       .pipe(browserSync.reload({stream:true}));
});

// Copy and compress js
gulp.task('js-optimize', ['build'], function (cb) {
  pump([
        gulp.src('_site/Assets/js/**/*.js'),
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

//Simple http server
gulp.task('serve', function() {
  gulp.src('_site/')
    .pipe(webserver({
      livereload: false,
      fallback: '/index.html',
      directoryListing: false,
      open: true,
      host:"0.0.0.0"
    }));
});

// Uglify html. Goes in a race condition against jekyll apparently
gulp.task('html-optimize', ['build'], function() {
    return gulp.src('./_site/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: false, //if on it will break our contact us page
            lint: false,
        }))
        .pipe(gulp.dest('./_site/'))
        .pipe(browserSync.reload({stream:true}));
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


gulp.task('test-internal', shell.task([
    'bundle exec htmlproofer _site/ --allow-hash-href --assume-extension --check-html --disable-external || true'
]));

gulp.task('test-external', ['test-internal'],shell.task([
    'bundle exec htmlproofer _site/ --external_only  || true'
]));

// Watch for changes and re-run related tasks
// Needs a few fixes
gulp.task('watch', function () {
    gulp.watch(['./**/*.html','./**/*.md','./**/*.yml'], ['jekyll-rebuild']);
    gulp.watch(['./**/*.scss'], ['sass']);
});

// test
gulp.task('test', ['test-external','test-internal']);


// Build css, site with jekyll, improve css with autoprefixer
gulp.task('build', ['jekyll-build','sass']);

// Build launch browsersync and watch for changes
gulp.task('default', ['browser-sync', 'watch']);

// Build and optimize html.
gulp.task('build-deploy', ['build', 'html-optimize', 'css-optimize', 'js-optimize']);
