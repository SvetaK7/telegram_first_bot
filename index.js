const TelegramApi = require('node-telegram-bot-api');

const token = '6272831171:AAHS6EebhGzV6uwDw6ApRF5gMGnKlfC0amM';

const bot = new TelegramApi(token, {polling: true});

const chats = {};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id
        // bot.sendMessage(chatId, `Ты написал мне ${text}`)
        console.log(msg)

        if (text === '/start'){
            await bot.sendMessage(chatId, `Добро пожаловать в телеграмм бот Светланы Козловой`)
            return bot.sendMessage(chatId, 'http://about-telegram.ru/wp-content/uploads/2018/03/kot-manul-stickers-telegram_05.jpg')
        }
        if (text === '/info'){
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }
        if (text === '/game'){
            await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!')
            const randomNumber = Math.floor(Math.random()*10);
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, 'Отгадывай')
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })
}

start();