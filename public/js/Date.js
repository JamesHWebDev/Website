

//Date(year, month, day, hour, minute, second, ms)
//const date = new Date(2024, 6, 12, 17, 50, 5, 5);


//GETTING DATES
const date1 = new Date()

const year = date1.getFullYear();
const month = date1.getMonth();
const day = date1.getDate();
const hour = date1.getHours();
const minutes = date1.getMinutes();
const seconds = date1.getSeconds();
const dayOfWeek = date1.getDay()


console.log(year);
console.log(month);
console.log(day);
console.log(hour);
console.log(minutes);
console.log(seconds);
console.log(dayOfWeek)




//SETTING NEW DATES
const date = new Date();


date.setFullYear(2024)
date.setMonth(0)
date.setDate(1)
date.setHours(2)
date.setMinutes(3)
date.setSeconds(4)

console.log(date)



//COMPARING DATES

const date3 = new Date('2022-10-15')
const date2 = new Date('2024-6-12')


if(date2 > date3){

console.log('HAPPY NEW YEAR!!')

}


