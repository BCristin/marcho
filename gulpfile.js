import browserSync from 'browser-sync';
import { deleteAsync as del } from 'del';
import pkg from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import fonter from 'gulp-fonter';
import imagemin from 'gulp-imagemin';
import gulpSass from 'gulp-sass';
import ttf2woff2 from 'gulp-ttf2woff2';
import uglify from 'gulp-uglify';
import * as sass1 from 'sass';

const sass = gulpSass(sass1);
const { dest, parallel, src, watch, series } = pkg;

function fonts() {
	return src('app/fonts/*.*')
		.pipe(
			fonter({
				formats: ['woff', 'ttf'],
			}),
		)
		.pipe(src('app/fonts/*.ttf'))
		.pipe(ttf2woff2())
		.pipe(dest('app/fonts'));
}
function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
	});
}

function styles() {
	return src('app/scss/styles.scss')
		.pipe(autoPrefixer({ overrideBrowserslist: ['last 3 version'], grid: true }))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream());
}

function script() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/rateyo/src/jquery.rateyo.js',
		'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
		'node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js',
		'app/js/main.js',
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream());
}

function images() {
	return src('app/images/**/*.*').pipe(imagemin()).pipe(dest('dist/images'));
}

function move() {
	return src(['app/**/*.html', 'app/css/style.min.css', 'app/js/main.min.js', 'app/fonts/*.*'], {
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

export { browsersync, build, cleanDist, fonts, images, move, script, styles, watching };
export default parallel(styles, script, browsersync, watching);
