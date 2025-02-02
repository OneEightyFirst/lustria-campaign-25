const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

// Paths
const paths = {
    styles: {
        src: 'src/assets/scss/**/*.scss',
        dest: 'dist/assets/css/'
    },
    scripts: {
        src: 'src/assets/js/**/*.js',
        dest: 'dist/assets/js/'
    },
    html: {
        src: 'src/index.html',
        dest: 'dist/'
    }
};

// Compile SCSS to CSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

// Minify JavaScript
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Minify HTML
function html() {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest));
}

// Watch files for changes
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.html.src, html);
}

// Define complex tasks
const build = gulp.series(gulp.parallel(styles, scripts, html));
const dev = gulp.series(build, watch);

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.build = build;
exports.dev = dev;
exports.default = build;