import { Request, Response, NextFunction } from 'express';
import { UserRegistration, ErrorResponse } from '../../../utils/index.ts';
import config from '../../../infrastructure/rabbitmq/rabbitmq.config.ts';
import bcrypt from "bcryptjs";


export = (depentencies: any): any => {
    const {
        useCases: {
            registerUser_UseCase,
            findUserByMail_useCase
        },
        RabbitMQClient
    } = depentencies;

    const registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const { error, value: data } = await UserRegistration.validator.validate(req.body, { abortEarly: true });
        let hashedPassword: string;
        try {
            const userExist = await findUserByMail_useCase(depentencies).execute(data.email)

            if (userExist) {
                return next(ErrorResponse.forbidden("Email already registered, try another mail"))
            }

            const saltRounds: number = Number(process.env.SALT_ROUNDS) || 10;
            const generatedSalt: string = await bcrypt.genSalt(saltRounds);
            hashedPassword = await bcrypt.hash(data.password, generatedSalt);
        } catch (error) {
            next(error)
        }

        let savedData: any;
        try {
            const user = {
                email: data.email,
                password: hashedPassword
            }
            savedData = await registerUser_UseCase(depentencies).execute(user)
        } catch (error) {
            next(error)
        }

        try {
            const result: any = await RabbitMQClient.Requester({
                userId: savedData._id,
                email: savedData.email,
                fullname: data.fullname,
                phoneNumber: data.phoneNumber,
                city: data.city,
                country: data.country
            }, config.rabbitMq.queues.userQueue, "registerUser");
            console.log(">> >> Debug log :result", result);
            
            if (result.isError === true) {
                next(ErrorResponse.forbidden(result.message));
            } else {
                return res.status(201).send({
                    success: true,
                    status: 201,
                    message: "Account created successfully",
                    data: result
                })
            }
        } catch (error) {
            return next(ErrorResponse.internalError('Something went wrong, try again!'))
        }
    };
    return registerUser
}
