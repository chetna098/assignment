import {Request,Response,NextFunction} from "express";
import {HttpError} from '../models/HttpError';
import {UpdateUserService} from "../services/UpdateUserService";
import {UserInterface} from "../models/User"




export class UpdateUserController {
    async handle(request: Request, response: Response, next: NextFunction) {
      // get data from request
      const { description }: UserInterface = request.body;
      const { userId } = request.params;
  
      const updateUserService = new UpdateUserService();
  
      let updatedUser: UserInterface | null = null;
  
      try {
        updatedUser = await updateUserService.execute(userId, description);
      } catch (err) {
        const error = new HttpError(err.message, 404);
        return next(error);
      }
  
      return response.json({ updatedUser });
    }
  }