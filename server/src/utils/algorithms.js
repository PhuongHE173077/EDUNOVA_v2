const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

export const deleteFields = (object, fields) => {
    fields.forEach(field => {
        delete object[field]
    })
    return object
}



export function evaluateAnswers(correctAnswers, userAnswers) {
    return correctAnswers.map(correctQuestion => {
        const userQuestion = userAnswers.find(q => q.id === correctQuestion.id);

        if (!userQuestion) {
            return {
                _id: correctQuestion._id,
                isCorrect: false
            };
        }

        const correctOptionIds = correctQuestion.options
            .filter(option => option.isCorrect)
            .map(option => option.id)
            .sort();

        const userCheckedIds = userQuestion.options
            .filter(option => option.isChecked)
            .map(option => option.id)
            .sort();

        const isCorrect = JSON.stringify(correctOptionIds) === JSON.stringify(userCheckedIds);

        return {
            _id: correctQuestion._id,
            isCorrect: isCorrect
        };
    });
}

export const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const allChars = upper + lower + numbers;

    let password = '';

    password += upper.charAt(Math.floor(Math.random() * upper.length));

    for (let i = 0; i < 7; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
};



const weekdayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

export function generateSlots(startDate, startTime, endTime, days, slotCount) {
    const activeWeekdays = days.map((d) => weekdayMap[d.toLowerCase()]);
    const results = [];

    let current = dayjs(startDate).startOf('day');

    while (results.length < slotCount) {
        if (activeWeekdays.includes(current.day())) {
            const start = current.hour(Number(startTime.split(':')[0])).minute(Number(startTime.split(':')[1])).second(0);
            const end = current.hour(Number(endTime.split(':')[0])).minute(Number(endTime.split(':')[1])).second(0);

            results.push({
                start: start.toISOString(),
                end: end.toISOString(),
            });
        }
        current = current.add(1, 'day');
    }

    return results;
}