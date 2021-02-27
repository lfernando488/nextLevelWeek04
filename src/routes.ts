import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { SendMainController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();

const surveyController = new SurveyController();

const sendMailController = new SendMainController();

const ansuwerController = new AnswerController();

router.post("/users", userController.create);

router.get("/users", userController.show);

router.post("/surveys", surveyController.create);

router.get("/surveys", surveyController.show);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", ansuwerController.execute);

export {router};