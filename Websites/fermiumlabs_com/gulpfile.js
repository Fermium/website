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


var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/* you should not run this task during development*/
gulp.task('optimize-images', function () {
    return gulp.src(['_site/**/*.jpg', '_site/**/*.jpeg', '_site/**/*.gif', '_site/**/*.png'])
        .pipe(imagemin({
            progressive: false,
            svgoPlugins: [{removeViewBox: false}]
            }))
        .pipe(gulp.dest('_site/'));
});

gulp.task('css-autoprefixer', function() {
   return gulp.src('_site/Assets/css/**/*.css')
       .pipe(autoprefixer())
       .pipe(gulp.dest('_site/Assets/css/'));
});

gulp.task('css-minify', function() {
   return gulp.src('_site/Assets/css/**/*.css')
       .pipe(minifyCss({keepBreaks: false}))
       .pipe(gulp.dest('_site/Assets/css/'));
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
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

gulp.task('less', function () {
  return gulp.src('Assets/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('_site/Assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('Assets/scss/**/*.scss', ['sass']);
    gulp.watch('Assets/sass/**/*.less', ['less']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});


// build css, site with jekyll, improve css with autoprefixer
gulp.task('build', ['sass', 'less', 'jekyll-build', 'css-autoprefixer']);

// build launch browsersync and watch for changes
gulp.task('default', ['browser-sync', 'watch']);

// build for deploy, with minification and (boring) image optimizations
gulp.task('build-deploy', ['build', 'css-minify', 'optimize-images']);
