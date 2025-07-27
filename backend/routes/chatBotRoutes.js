const { createRouter } = require("../utils/routerHelper");
const HttpMethods = require("../utils/httpMethods");

const { chatbotHandler } = require("../controllers/chatBotController");

const routes = [
  {
    method: HttpMethods.POST,
    path: "/chatbot",
    handlers: [chatbotHandler],
  }
];

const router = createRouter(routes);

module.exports = router;
