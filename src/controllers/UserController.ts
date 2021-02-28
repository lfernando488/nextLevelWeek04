import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';

class UserController{

    async create (request: Request, response: Response){
        const {name, email} = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        })

    try {
        await schema.validate(request.body);
    } catch (err) {
        return response.status(400).json({
            error: err
        });
    }

        const usersRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists){
            return response.status(400).json({
                error: "User already exists"
            })
        }
        
        const user = usersRepository.create({
            name, email
        })

        await usersRepository.save(user);

        return response.json(user);
    }

    async show(request: Request, response:Response){

        const usersRepository = getCustomRepository(UserRepository);

        const all = await usersRepository.find();

        return response.json(all);

    }

}

export { UserController } ;