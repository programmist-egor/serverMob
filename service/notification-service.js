import {Expo} from "expo-server-sdk";

let savedPushTokens = [];

let expo = new Expo();

const handlePushTokens = (message) => {
    let notifications = [];
    for (let pushToken of savedPushTokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push токен ${pushToken} не является действительным push-токеном Expo`);
            continue;
        }

        notifications.push({
            to: pushToken,
            sound: 'default',
            body: message.body,
            data: {...message.data},
        });
    }

    let chunks = expo.chunkPushNotifications(notifications);
    let tickets = [];
    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();
};


class NotificationService {
    async sendMessage(message) {
        try {
            handlePushTokens(message);
            return {success: true, data: message};
        } catch (error) {
            console.error("Error in getAllRatingObject:", error);
            return {success: false, error: "Failed to get ratings"};
        }
    }

    async saveToken(token) {
        try {
            console.log("token", token);
            if (savedPushTokens.indexOf(token) === -1) {
                savedPushTokens.push(token);
            }
            return {success: true, data: "Получен push-токен"};

        } catch (error) {
            return {success: false, error: "Не удалось получить push-токен"};
        }
    }
}

export default new NotificationService()


