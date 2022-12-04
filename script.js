"use strict";

const personalMovieDB = {
        count: 0,
        movies: {},
        actors: {},
        genres: [],
        private: false,
        start: function () {
          personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        
          while(personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
          }
        },
        rememberMyFilms: function() {
          for (let i = 0; i < 2; i++){
            const a = prompt('Один из последних просмотренных фильмов?', '').trim(),
                  b = prompt('На сколько оцените его?', '');
          
            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
              personalMovieDB.movies[a] = b;
              console.log('done');
            } else {
              console.log('error');
              i--;
            }
          }
        },
        detectPersonalLevel: function() {
          if (personalMovieDB.count < 10) {
            console.log('Просмотрено довольно мало фильмов');
          } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log('Вы классический зритель');
          } else if (personalMovieDB.count >= 30) {
            console.log('Вы киноман');
          } else {
            console.log('Произошла ошибка');
          }
        },
        showMyDB: function(hidden) {
          if (!hidden) {
            console.log(personalMovieDB);
          }
        },
        writeYouGenres: function() {
          for (let i = 1; i <= 3; i++) {
            let genre = prompt(`Ваш любимый жанр под номером ${i}`).toLowerCase();
            if (genre == null || genre == '') {
              console.log('Вы ввели некорректные данные');
              i--;
            } else {
              personalMovieDB.genres[i - 1] = genre; 
            }
          }
          personalMovieDB.genres.forEach(function(item, i) {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
          });
        },
        toggleVisibleMyDB: function() {
          if (personalMovieDB.private) {
            personalMovieDB.private = false;
          } else {
            personalMovieDB.private = true;
          }
          // return personalMovieDB.private;
        }
      };

      const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi', 'Sam'];

function sortStudentsByGroups(arr) {
    arr.sort();
    const a = [], b = [], c = [], rest = [];

    for (let i = 0; i < arr.length; i++) {
        if (i < 3) {
            a.push(arr[i]);
        } else if (i < 6) {
            b.push(arr[i]);
        } else if (i < 9) {
            c.push(arr[i]);
        } else {
            rest.push(arr[i]);
        }
    }
    return [a,b,c, `Оставшиеся студенты: ${rest.length === 0 ? '-' : rest.join(', ')}`]
}

sortStudentsByGroups(students);