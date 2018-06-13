var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var preccs = require('precss');

gulp.task('css', function () {
    var processors = [ autoprefixer('last 2 versions'), 
                    stylelint({
                        "rules": {
                        "color-no-invalid-hex": true,
                        "color-hex-case": "lower"
                        }
                    }), 
                    reporter({clearMessages: true}),
                    preccs()
    ];  
    return gulp.src('./src/*.css')    
        .pipe(postcss(processors))    
        .pipe(gulp.dest('./dist'));
});

//Default
gulp.task( 'default', ['css', 'watch'] );

// HTML src-dist sync
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({server: "./dist"});
    gulp.watch("dist/*.css", ['css']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});
// Watch
gulp.task('watch', function(){
    gulp.watch('./src/**/*.css', ['css', browserSync.reload]);
    gulp.watch('./src/**/*.html', ['html', browserSync.reload]);
});
    
gulp.task('default', ['css', 'html', 'browser-sync', 'watch']);