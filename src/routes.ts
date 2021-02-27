import { Router } from 'express';
import { SendMainController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();

const surveyController = new SurveyController();

const sendMailController = new SendMainController();

router.post("/users", userController.create);

router.get("users", userController.show);

router.post("/surveys", surveyController.create);

router.get("/surveys", surveyController.show);

router.post("/sendMail", sendMailController.execute);

export {router};