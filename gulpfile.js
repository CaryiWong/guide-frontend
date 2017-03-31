// generated on 2016-08-18 using generator-webapp 2.1.0
// const polyfill = require('babel-polyfill');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const gutil = require('gulp-util');
const assetsFunctions = require('node-sass-asset-functions');
//const webpack = require('webpack');
//const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');
//const webpackConfig = require('./webpack.config');
//const webpackConfigProduction = require('./webpack.production.config');
//const webpackBundler = webpack(webpackConfig);
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

function styles() {
	return gulp.src('app/styles/scss/*.scss')
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: [
            '.',
            'app/styles',
            'node_modules/bootstrap-sass/assets/stylesheets',
  		  'node_modules'
        ],
        functions: assetsFunctions({images_path: 'app'})
      }).on('error', $.sass.logError))
      .pipe($.autoprefixer({browsers: ['last 3 version', 'Android 4']}))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('app/styles'))
      .pipe(reload({stream: true}));
}

gulp.task('styles', () => {
  	return styles();
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('styles:dist',  () => {
	return styles();
});

gulp.task('webpack', function (cb) {
    return webpack(webpackConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('{webpack}', stats.toString({
            chunks: false,
            colors: true
        }));
        cb && cb();
    });
});

gulp.task('webpack:dist',['html'], function (cb) {
    return webpack(webpackConfigProduction, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('{webpack}', stats.toString({
            chunks: false,
            colors: true
        }));
        cb && cb();
    });
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}
gulp.task('lint', () => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['styles:dist','scripts','copy-js'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    // .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
	.pipe($.if('!**/*.html', $.rev()))
	.pipe($.revReplace())
	.pipe($.if('**/*.html', gulp.dest('dist')))
	.pipe($.if(['**/*', '**/*.js', '!**/*.html'], gulp.dest('dist')));
});

gulp.task('copy-js', () => {
    return gulp.src('app/scripts/lib/*.js')
        .pipe(gulp.dest('dist/scripts/lib'));
});

gulp.task('images', () => {
	return gulp.src('app/images/**/*')
		.pipe($.if($.if.isFile, $.cache($.imagemin({
			progressive: true,
			interlaced: true,
			svgoPlugins: [{cleanupIDs: false}]
		}))
		.on('error', function(err) {
			this.end();
		})))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});


gulp.task('clean', del.bind(null, ['.tmp', '.html', 'dist']));

gulp.task('serve', [ 'styles'], () => {
    browserSync({
        open: false,
        port: 5888,
        ui: {
            port: 5899,
            weinre: {
                port: 5877
            }
        },
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
		        '/node_modules': 'node_modules'
            }
        },
        //middleware: [
        //    webpackDevMiddleware(webpackBundler, {
        //        publicPath: webpackConfig.output.publicPath,
        //        noInfo: true,
        //        stats: {
        //            colors: true
        //        }
        //    }),
        //    webpackHotMiddleware(webpackBundler)
        //]
    });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    'app/styles/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/scss/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('serve:dist', () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['images','html'], () => {
	console.log('all done');
	// return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
