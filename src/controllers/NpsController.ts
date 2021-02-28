import { getCustomRepository, Not, IsNull } from 'typeorm';
import { Response, Request } from 'express';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController{

    async execute (request: Request, response: Response){

        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        })

        const detractor = surveyUsers.filter(survey => 
            (survey.value >= 0 && survey.value <= 6)    
        ).length;

        const promoters = surveyUsers.filter(survey => 
            (survey.value >= 9 && survey.value <= 10)    
        ).length;

        const passive = surveyUsers.filter(survey => 
            (survey.value >= 7 && survey.value <= 8)    
        ).length;

        const totalAnswers = surveyUsers.length;

        const calculate = ( promoters - detractor) / totalAnswers;

        return response.json({
            detractor,
            promoters, 
            passive,
            totalAnswers,
            nps: calculate
        });

    }

}

export { NpsController };