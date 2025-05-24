//

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
