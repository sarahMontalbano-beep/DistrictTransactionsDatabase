const auth = require('../../middleware/authentication');
var fs = require('fs');
const spawn = require('child_process').spawn;

const router = require('express').Router();

router.route('/query').post( async (req, res, next) => {
    if (!res.locals.user) {
        res.status(401).send({ detail: 'Unauthorized user' });
    }
    else {
        try {
            let query = req.body.query ?? '';
            let queryLower = query.toLowerCase();

            if (queryLower && queryLower.indexOf('set') == -1 && queryLower.indexOf('create') == -1 
            && queryLower.indexOf('delete') == -1) {
                const results = await res.locals.neo4jSession.readTransaction(
                    tx => tx.run(query));
                const resultsArr = [];
                results.records.forEach(element => {
                    resultsArr.push(element._fields[0].properties);
                });
                let data = {results: resultsArr, summary: results.summary}
                res.json({data: data});
            }
            else {
                const result = await res.locals.neo4jSession.writeTransaction(
                    tx => tx.run(query));
                res.json({result: result});
            }
        }
        catch {
            next();
        }
    }
});

router.route('/upload').post( async (req, res, next) => {
    console.log('Upload hit')
    // console.log(req)
    // if (!res.locals.user) {
    //     res.status(401).send({ detail: 'Unauthorized user' });
    // }
    // else {
        try {

            let year = req.body.year;
            console.log(year)

            let district = req.body.district
            console.log(district)

            // let file = req['files'].file;
            // console.log("File uploaded: ", file.name);

            // fs.writeFile('C:\\Users\\eBay User\\Documents\\CLASSES\\CSCI483\\DistrictTransactionsDatabase\\backend\\public\\file.csv',
            //     file.data, err => {
            //     if (err) {
            //       console.error(err);
            //     }
            // });

            const fc = spawn('python', 
            ['../../cleaning_script/cap_main.py']);

            let output;

            // fc.stdin.on();

            fc.stdout.on("data", (data) => {
                output += data.toString();
            });
            fc.on("close", () => {                     // this differs 
                console.log(output);
                res.sendStatus(200);
            });

        }
        catch(e) {
            console.log(e)
            next();
        }
    // }
});

module.exports = router;