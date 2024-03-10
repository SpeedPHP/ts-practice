import { GetMapping, PostMapping, upload } from '../src/route-mapping.decorator';
import { log, onClass} from '../src/speed';
import * as multiparty from "multiparty";

@onClass
export default class UploadPage {

  @PostMapping("/upload")
  uploadFromLib(req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      res.end("Uploaded: " + JSON.stringify(files));
    });
  }

  @upload
  @PostMapping("/upload2")
  uploadFromDecorator(req,res) {
      log(req.files);
      res.end("Uploaded: " + JSON.stringify(req.files));
  }

  @GetMapping("/form")
  form(req, res) {
    res.render("upload");
  }
}