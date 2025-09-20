import express from "express";

import { viewProblem, viewOneProblem, createProblem, editProblem, deleteProblem  } from "../controllers/problemController.js";

const problemRouter = express.Router();

//getting all the problems
problemRouter.get('view', viewProblem);
problemRouter.get('view/:id', viewOneProblem);

problemRouter.post('create', createProblem);
problemRouter.put('edit/:id', editProblem);
problemRouter.delete('delete/:id', deleteProblem);

export default problemRouter; 