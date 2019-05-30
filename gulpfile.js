"use strict";

var gulp = require("gulp"); 
var sass = require("gulp-sass"); 
var plumber = require("gulp-plumber"); 
var postcss = require("gulp-postcss");
var csscomb = require("gulp-csscomb");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence");
var del = require("del");
var gulpCopy = require("gulp-copy");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat"); 
var server = require("browser-sync").create();

gulp.task("style", function () {
    gulp.src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({browsers: ["last 15 version", "> 1%", 'ie 8', 'ie 7']}),
            mqpacker({sort: true})
        ]))
        .pipe(csscomb())
        .pipe(gulp.dest("source/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/source/css"))
        .pipe(server.stream());
});

gulp.task("images", function () {
    return gulp.src("build/source/img/**/*.{png,jpg,gif,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest("build/source/img"));
});

gulp.task("serve", function () {
    server.init({
        server: "build/source",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("source/sass/**/*.scss", ["style"]);
    gulp.watch("source/*.html", ["gulpCopy"]).on("change", server.reload);
    gulp.watch("source/js/**/*.js", ["minjs"]).on("change", server.reload); 
    gulp.watch("source/img/**/*.{png,jpg,gif,svg}", ["images"]);
    gulp.watch("source/libs/**/*.js", ["jslibs"]).on("change", server.reload);
});

gulp.task("jslibs", function () {
    return gulp.src([ 
        "source/libs/jquery.min.js"
    ])
        .pipe(concat("libs.min.js")) 
        .pipe(uglify()) 
        .pipe(gulp.dest("build/source/libs")); 
});

gulp.task("gulpCopy", function () {
    return gulp.src([
            "source/*html"
            ],
        {base: "."})
        .pipe(gulp.dest("build"));
});

gulp.task("minjs", function () {
    return gulp.src([
        "source/js/preloader.js",
        "source/js/showMe.js",
        "source/js/valid-email.js",
        "source/js/sortRoom.js",
        "source/js/sort.js",
        "source/js/toTop.js",
        "source/js/nav.js"
    ])
        .pipe(concat("minjs.js")) 
        .pipe(uglify())
        .pipe(gulp.dest("build/source/js"));
});

gulp.task("copy", function () {
    return gulp.src([
            "source/fonts/**/*.{woff,woff2,ttf}",
            "source/img/**",
            "source/js/minjs.js",
            "source/libs/**",
            "source/*html",
            "source/*php",
            "source/favicon.png",
            "source/*pdf",
            "source/*pdf",
            "source/css/normalize.css"
            ],
        {base: "."})
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task("build", function (fn) {
    run("clean", "copy", "style", "images", "minjs", "jslibs", fn);
});