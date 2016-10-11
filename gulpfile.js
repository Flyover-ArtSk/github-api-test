var gulp = require('gulp')
var concat = require('gulp-concat')
var embedTemplates = require('gulp-angular-embed-templates');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var path = 'app/src/**/';

gulp.task('js', function () {
    gulp.src([path + 'app.js', path + '*.js'])
        .pipe(embedTemplates())
        .pipe(concat('app/bundle.js'))
        .pipe(gulp.dest('.'))
});

gulp.task('css', function () {
    gulp.src([path + '*.css'])
        .pipe(concat('app/bundle.min.css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('.'))
});

gulp.task('minifyJS', function() {
    return gulp.src([path + 'app.js', path + '*.js'])
        .pipe(embedTemplates())
        .pipe(concat('app/bundle.min.js', {newLine: ';'}))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(uglify({ mangle: true }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['js'], function() {
    gulp.watch([path + '*.js', path + '*.html'], ['js']);
    gulp.watch([path + '*.css'], ['css']);
});