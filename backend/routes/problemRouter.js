import express from "express";
import userAuth from '../middleware/userAuth.js';
import adminAuth from "../middleware/adminAuth.js";
import { viewProblem, viewOneProblem, createProblem, editProblem, deleteProblem  } from "../controllers/problemController.js";

const problemRouter = express.Router();

//getting all the problems
problemRouter.get('/view', viewProblem);
problemRouter.get('/view/:id', viewOneProblem);


//for the admin only
problemRouter.post('/create',userAuth, adminAuth, createProblem );
problemRouter.put('/edit/:id',userAuth, adminAuth, editProblem);
problemRouter.delete('/delete/:id',userAuth, adminAuth, deleteProblem);

export default problemRouter; 