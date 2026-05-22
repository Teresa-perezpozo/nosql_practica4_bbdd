// Cargamos los modelos para usarlos posteriormente
const Patient = require('../models/patient');

exports.list = async function() {
    console.log("entra en el método list");

        try{
            const patients = await Patient.find();
            console.log("patients: ", patients);
            return patients;
        }catch(error){
            console.error("error de tipo: ",error)
            throw error;
        }
}

exports.read = async function(patientId) {
console.log("entra en el método read");
    try{
        return await Patient.findById(patientId);
    }catch(error){
        throw error;
    }

}

exports.create = async function(body) {
    const newPatient = new Patient(body)
    console.log("BODY: ", body);
    return await newPatient.save();
}

exports.update= async function(patientId, body) {
    let result = await Patient.findOneAndUpdate(
        { _id: patientId },
        body,
        { new: true }
    );

    console.log("BODY: ", body);
    console.log("patientId: ", patientId);

    return result;

}

exports.delete = async function(patientId) {
    return await Patient.deleteOne({_id:patientId});
}

exports.filterPatientsByCity = async function (city) {
    return await Patient.find({city : city});
}

exports.filterPatientsByDiagnosis = async function (diagnosis) {
    let result = await Patient.find({
        "medicalHistory.diagnosis": diagnosis
    });

    return result;}

exports.filterPatientsBySpeacialistAndDate = async function (specialist, sDate,fDate) {
    return await Patient.find({
        medicalHistory: {
            $elemMatch: {
                specialist: specialist,
                date: {
                    $gte: new Date(sDate),
                    $lte: new Date(fDate)
                }
            }
        }
    });
}

exports.addPatientHistory = async function (patientId, medicalRecord) {
    return await Patient.findOneAndUpdate(
        { _id: patientId },
        { $push: { medicalHistory: medicalRecord } },
        { new: true }
    );
}