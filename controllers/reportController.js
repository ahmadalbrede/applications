const reportService = require('../service/reportService');
const File = require('../models/File');
const fs = require('fs');
const readline = require('readline');

exports.getReportForMember = (req , res ,next)=>{
    reportService.getReportForMember(req.query.fileId)
    .then(result =>{
        return res.status(200).json({
            message : "reports for file",
            data : result 
        })
    }).catch(err => next(err));
}

exports.getReportToUser = (req ,res , next)=>{
    reportService.getReportToUser(req.query.userId , req.query.groupId)
    .then(result=>{
        return res.status(200).json({
            message : "reports for user",
            data : result 
        });
    }).catch(err => next(err));
}
const { Readable } = require('stream');

exports.test = (req , res , next)=>{
const file1 = req.file.path;
File.findOne({
    where : {id : req.query.fileId}
}).then(file2Data =>{
    console.log('ladf;jka;dkal')
    compareFiles( file2Data.path ,file1).then(result => {return res.status(200).json(result);});
})
// .then(result =>{
//     return res.status(200).json(result);
// })
.catch(err => next(err));

}
async function compareFiles(file1 , file2){
    const fileStream1 = fs.createReadStream(file1);
    const fileStream2 = fs.createReadStream(file2);

    const rl1 = readline.createInterface({ input: fileStream1 ,crlfDelay: Infinity});
    const rl2 = readline.createInterface({ input: fileStream2 });

    const file1Lines = [];
    const file2Lines = [];
    const differingLines = {};

    // for await (const line of rl1) file1Lines.push(line);
    rl1.on('line', (line) => {
        file1Lines.push(line);
    });
    for await (const line of rl2) file2Lines.push(line);

    const maxLines = Math.max(file1Lines.length, file2Lines.length);

    for (let i = 0; i < maxLines; i++) {
        if (file1Lines[i] !== file2Lines[i]) {
            differingLines.push({
                lineNumber: i + 1,
                newFileContent: file1Lines[i] || null,
                oldFileContent: file2Lines[i] || null,
            });
        }
    }
    return differingLines ;
}
// async function compareFiles(file1, file2Data) {
//     const fileStream1 = fs.createReadStream(file1);

//     // Convert the file data from the database into a readable stream
//     const fileStream2 = new Readable();
//     fileStream2.push(file2Data); // Push the file content
//     fileStream2.push(null); // Signal the end of the stream

//     const rl1 = readline.createInterface({ input: fileStream1 });
//     const rl2 = readline.createInterface({ input: fileStream2 });

//     const file1Lines = [];
//     const file2Lines = [];
//     const differingLines = [];

//     // Read all lines into arrays
//     for await (const line of rl1) file1Lines.push(line);
//     for await (const line of rl2) file2Lines.push(line);

//     const maxLines = Math.max(file1Lines.length, file2Lines.length);

//     for (let i = 0; i < maxLines; i++) {
//         if (file1Lines[i] !== file2Lines[i]) {
//             differingLines.push({
//                 lineNumber: i + 1,
//                 file1Content: file1Lines[i] || null,
//                 file2Content: file2Lines[i] || null,
//             });
//         }
//     }
//     console.log(differingLines);
//     return differingLines;
// }