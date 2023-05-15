import { Request, Response, NextFunction } from 'express';
import { UserRegistration, ErrorResponse } from '../../utils/index.ts';
// import RabbitMQClient from '../../infrastructure/rabbitmq/client.ts';
// import config from '../../infrastructure/rabbitmq/rabbitmq.config.ts';
import bcrypt from "bcryptjs";


export = (depentencies: any): any => {
    const {
        useCases: {
            registerUser_UseCase,
            findUserByMail_useCase
        }
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
            return res.status(200).send({ status: 200, message: "User registred successfully!", data: savedData })
        } catch (error) {
            next(error)
        }
    };
    return registerUser
}
/*
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { error, value: data } = await Validators.userRegistration.validateUserRegistration.validate(req.body, { abortEarly: true });
    const authModel = mongoose.model('authentication', schemas.authSchema);
    const user = await authModel.findOne({ email: 'email@address.com' });

    let hashedPassword: string;
    try {
        if (error) {
            return next(ErrorResponse.notFound(error.message));
        }

        const user = await authModel.findOne({ email: data.email })
        if (user) {
            return next(ErrorResponse.badRequest('Email already registered'));
        }

        const saltRounds: number = Number(process.env.SALT_ROUNDS) || 10;
        const generatedSalt: string = await bcrypt.genSalt(saltRounds);
        hashedPassword = await bcrypt.hash(data.password, generatedSalt);
    } catch (error) {
        return next(error)
    }

    let savedData: any;
    try {
        const newUser = new schemas.auth({
            email: data.email,
            password: hashedPassword,
        });
        savedData = await newUser.save();
    } catch (error: any) {
        if (error.code === 11000)
            return next(ErrorResponse.badRequest('This email is already registered. Try a different email or log in'));
        return next(error);
    }

    try {
        const result: any = await RabbitMQClient.Requester({
            userId: savedData._id,
            email: savedData.email,
            fullname: data.fullname,
            phoneNumber: data.phoneNumber,
            city: data.city,
            country: data.country
        }, config.rabbitMq.queues.userQueue, "register");
        console.log("Result from User in Auth is ", result);
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
    return next(ErrorResponse.badRequest('Something went wrong, try again!'));
}

export const checkUserCredentials = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await schemas.auth.findOne({ email: req.body.email });
        if (!user) {
            return next(ErrorResponse.notFound('User not found'));
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return next(ErrorResponse.unauthorized('Invalid password'))
        }
        res.status(200).send({ satus: 200, success: true, userId: user._id })
    } catch (error) {
        return next(error)
    }
}
*/