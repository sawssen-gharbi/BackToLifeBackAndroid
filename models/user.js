import mongoose from 'mongoose';
import therapy from "../models/therapy.js";
const { Schema, model } = mongoose;
const UserSchema = new Schema({

    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },

    phone: {
        type: String
    },
    role: {
        type: String
    },
    //doctor's speciality
    speciality: {
        type: String
    },
    address: {
        type: String
    },
    photo: {
        type: String
    },
    certificate: {
        type: String
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report'
    }],


    therapy: { type: Schema.Types.ObjectId, ref: 'therapy' },
    reservation: { type: Schema.Types.ObjectId, ref: 'reservation' },
},
    {
        timestamp: true
    }
);

export default mongoose.model('user', UserSchema);