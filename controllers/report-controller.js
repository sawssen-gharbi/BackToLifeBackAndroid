import report from "../models/report.js";
import user from "../models/user.js";


export async function addReport(req,res){

    const verifReport = await report.findOne({ date : req.body.date });
    if (verifReport) {
        console.log("report already exists")
        res.status(403).send({ message: "Report already exists !" });
    } else {
        
       user.findOne({ _id: req.query.idUser })
       
      
        const newReport = new report();

        newReport.date = req.body.date;
        newReport.mood = req.body.mood;
        newReport.depressedMood = req.body.depressedMood;
        newReport.elevatedMood = req.body.elevatedMood;
        newReport.irritabilityMood = req.body.irritabilityMood;
        newReport.symptoms = req.body.symptoms;
        newReport.user = req.body.user;

        newReport.save();

        console.log("user", newReport.user)
        res.status(201).send({ message: "Success : You Made Your Report Of Today", report: newReport});

    }
      

};


export async function getReport(req,res){
    const Report = await report.find({  user : req.params.id })
    if (Report) {
        res.status(200).send(Report);
    } else {
        res.status(403).send({ message: "fail" });
    }
}


export async function deleteReport(req,res){
    const Report = await report.findOneAndDelete({ _id: req.params.id })
    res.status(200).send({  message: "Success: Report Deleted" });
}

export async function editReport(req, res){

    const editedReport = await report.findOneAndUpdate({ _id: req.params.id },
        {
         
                date : req.body.date,
                mood: req.body.mood,
                depressedMood : req.body.depressedMood,
                elevatedMood : req.body.elevatedMood,
                irritabilityMood: req.body.irritabilityMood,
                symptoms : req.body.symptoms,
            }
    
    );

    res.status(201).send({ message: "Success : You Edit Your Report ",  editedReport});
};


