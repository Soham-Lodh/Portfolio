import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        enum:['Web Development','AI/ML'],
        required:true
    },
    technologies:{
        type:[String],
        default:[]
    },
    githubLink:{
        type:String,
        required:true
    },
    liveLink:{
        type:String,
        required:true
    }
});
const projectModel = mongoose.model('projects',projectSchema);
export default projectModel;