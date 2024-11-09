import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { filePaths } from '../config/paths.js';
import { logger } from "../config/logger.js";

const createSvgSprite = () => {
  return gulp.src(filePaths.src.svgIcons, {})
    .pipe(logger.handleError('COPY ROOT FILES'))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../symbol/sprite.svg',

            /** Создавать страницу с перечнем иконок */
            example: true,
          },
        },
      })
    )
    .pipe(gulp.dest(filePaths.srcFolder + '/icons'))
    .pipe(gulp.dest(filePaths.buildFolder + '/icons'));
};

export { createSvgSprite };