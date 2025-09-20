import Problem from "../models/problemModel.js";

// view all problem
export const viewProblem = async(req, res)=>{
    try{
        const problem = await Problem.find().sort({createdAt: -1});
        res.status(200).json(problem);
    }catch(error){
        res.json({success: false, message:"error at get_all_problem_controller ", error});
    }
}

// view one problem
export const viewOneProblem = async(req, res)=>{
    try{
        const problem = await Problem.findById(req.params.id);
        if(!problem) return res.status(404).json({success: false, message:"no problem to be found by the given id"});
        res.status(200).json(problem);
    }catch(error){
        console.log("error in  the view_one_problem_by_id controller", error);
        res.status(500).json({success: false, message:"error -> viewOneProblem_controller :", error})
    }
}

//create problem
export const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      inputFormat,
      outputFormat,
      sampleTestCases,
      hiddenTestCases,
      difficulty,
    } = req.body;

    // Check if problem with same title exists
    const existingProblem = await Problem.findOne({ title });
    if (existingProblem) {
      return res.status(400).json({ message: "Problem title already exists" });
    }

    const newProblem = new Problem({
      title,
      description,
      inputFormat,
      outputFormat,
      sampleTestCases,
      hiddenTestCases,
      difficulty,
    });

    await newProblem.save();

    res.status(201).json({
      message: "Problem created successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error creating problem:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// edit problem
export const editProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      inputFormat,
      outputFormat,
      sampleTestCases,
      hiddenTestCases,
      difficulty,
    } = req.body;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Update fields only if provided
    if (title) problem.title = title;
    if (description) problem.description = description;
    if (inputFormat) problem.inputFormat = inputFormat;
    if (outputFormat) problem.outputFormat = outputFormat;
    if (sampleTestCases) problem.sampleTestCases = sampleTestCases;
    if (hiddenTestCases) problem.hiddenTestCases = hiddenTestCases;
    if (difficulty) problem.difficulty = difficulty;

    const updatedProblem = await problem.save();

    res.status(200).json({
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.error("Error editing problem:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// delete problem
export const deleteProblem = async(req, res)=>{
    try{
        const delProb = await Problem.findByIdAndDelete(req.params.id);

        if(!delProb) return res.status(404).json({success: false, message:"no problem user under the given id"});
        res.status(200).json({success: true, message:"problem deleted successfullt"});
    }catch(error){
        console.error("error in deleting the problem set ");
        res.status(500).json({success: false, message:"inter server error at delete problem set"});
    }
}