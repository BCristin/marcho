import browserSync from 'browser-sync';
import { deleteAsync as del } from 'del';
import pkg from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import imagemin from 'gulp-imagemin';
import gulpSass from 'gulp-sass';
import uglify from 'gulp-uglify';
import * as sass1 from 'sass';

const sass = gulpSass(sass1);
const { dest, parallel, src, watch, series } = pkg;

function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
	});
}

function styles() {
	return src('app/scss/styles.scss')
		.pipe(autoPrefixer({ overrideBrowserslist: ['last 10 version'], grid: true }))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream());
}

function script() {
	return src(['node_modules/jquery/dist/jquery.js', 'app/js/main.js'])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream());
}

function images() {
	return src('app/images/**/*.*').pipe(imagemin()).pipe(dest('dist/images'));
}

function move() {
	return src(['app/**/*.html', 'app/css/style.min.css', 'app/js/main.min.js'], {
		base: 'app',
	}).pipe(dest('dist'));
}

function cleanDist() {
	return del('dist');
}

function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], script);
	watch(['app/**/*.html']).on('change', browserSync.reload);
}

const build = series(cleanDist, images, move);

export { browsersync, build, cleanDist, images, script, styles, watching };
export default parallel(styles, script, browsersync, watching);
