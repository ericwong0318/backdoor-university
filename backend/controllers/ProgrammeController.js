
const Programme = require("../models/ProgrammeModel");


exports.programmeList = (req, res) => {
    Programme.find({}, 'school programme type info comments', {}, (err, programme) => {
        if (programme === []) {
            return res.status(401).json({ err: "No programme in the database" });
        }
        return res.json(programme);
    });
}

exports.programmeCreate = (req, res) => {
    Programme.create({
        school: req.body.school,
        programme: req.body.programme,
        type: req.body.type,
        info: req.body.info,
    },
        (err) => {
            if (err) {
                return res.json({ err: "Can not create a programme" });
            }
            return res.json({ msg: "Programme created successful" });
        }
    );
}

exports.programmeUpdate = (req, res) => {
    Programme
        .findOne(
            { school: req.body.oldSchool, programme: req.body.oldProgramme }, 'school programme type info')
        .exec((err, programme) => {
            if (err) {
                return res.json({ err: "modify failed" })
            }
            programme.school = req.body.newSchool;
            programme.programme = req.body.newProgramme;
            programme.type = req.body.type;
            programme.info = req.body.info;
            programme.save();
            return res.json({ msg: "Programme is modified successfully" })
        });
}

exports.programmeCommentUpdate = (req, res) => {
    let email = req.body.email;
    let content = req.body.content;
    Programme.findOne({ school: req.body.school, programme: req.body.programme }, 'comments', {}, (err, programme) => {
        if (err) {
            return res.json({ err: "Comment cannot submitted" });
        }
        programme.comments.push({
            email: email,
            content: content
        });
        programme.save();
        res.json({ msg: "Comment submitted" });
    });
}
