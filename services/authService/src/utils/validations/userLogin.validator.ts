import Joi from 'joi';

export class UserLogin {
    static validator = Joi.object({
        email: Joi.string().email().required()
            .messages({
                'string.email': 'Please enter a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string().required()
            .messages({
                'any.required': 'Password is required'
            })
    });
}
