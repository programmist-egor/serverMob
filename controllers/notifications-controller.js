import ChatSupportService from "../service/chat-support-service.js";
import NotificationService from "../service/notification-service.js";


class NotificationController {
    async sendMessage(req, res, next) {
        try {
            const { message } = req.body;
            const data = await NotificationService.sendMessage(message)
            return res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async saveToken(req, res, next) {
        const { token } = req.body;
        try {
            const data = await NotificationService.saveToken(token)
            return res.json(data)
        } catch (error) {
            next(error);
        }
    }
}

export default new NotificationController()