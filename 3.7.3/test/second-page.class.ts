// TODO: 3.7.3
// import * as util from "util"
// import * as multiparty from "multiparty";
// import { log, onClass } from "../src/speed";
// import { GetMapping, PostMapping, upload } from "../src/route-mapping.decorator";

// @onClass
// export default class SecondPage {

//     @PostMapping("/upload2")
//     public upload2(req, res) {
//         const form = new multiparty.Form();
//         form.parse(req, (err, fields, files) => {
//             res.writeHead(200, { 'content-type': 'text/plain' });
//             res.write('received upload:\n\n');
//             log(files);
//             res.end(util.inspect({ fields: fields, files: files }));
//         });
//     }

//     @PostMapping("/upload")
//     @upload
//     public upload(req, res) {
//         const files = req.files;
//         log(files);
//         log("uploaded");
//         res.send("upload success");
//     }

//     @GetMapping("/form")
//     form(req, res) {
//         res.render("upload");
//     }
// }