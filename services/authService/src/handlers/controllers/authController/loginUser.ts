import { Request, Response, NextFunction } from 'express';
import { UserLogin, ErrorResponse } from '../../../utils/index.ts';
import bcrypt from "bcryptjs";


export = (depentencies: any): any => {
    const {
        useCases: {
            findUserByMail_useCase
        }
    } = depentencies;

    const loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const { error, value: data } = await UserLogin.validator.validate(req.body, { abortEarly: true });
        try {
            const user = await findUserByMail_useCase(depentencies).execute(data.email)

            if (!user) {
                return next(ErrorResponse.notFound("User not found"))
            }

            const passwordMatch = await bcrypt.compare(data.password, user.password);
            if (!passwordMatch) {
                return next(ErrorResponse.unauthorized('Invalid password'))
            }
            res.status(200).send({ satus: 200, success: true, userId: user._id });

        } catch (error) {
            next(error)
        }
    };
    return loginUser
}