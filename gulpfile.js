const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-sass');
    imagemin = require('gulp-imagemin');


//创建并发布任务
gulp.task('js',function(){
    return gulp.src('./src/js/*.js').pipe(uglify()).pipe(gulp.dest('dist/js'));
})

//压缩图片
gulp.task('img',function(){
    return gulp.src('./src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
})
//压缩css
gulp.task('css',function(){
    return gulp.src('./src/sass/*.scss').pipe(cssnano()).pipe(gulp.dest('dist/css'));
})
//发布监听任务
gulp.task('default',function(){
    gulp.watch('./src/js/*.js',['js']);
    gulp.watch('./src/images/*',['img']);
    gulp.watch('./src/sass/*.scss',['css']);
})