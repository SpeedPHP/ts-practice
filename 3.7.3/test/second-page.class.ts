import { log, onClass} from '../src/speed';
import * as multiparty from "multiparty";
import { GetMapping, PostMapping, upload } from '../src/route-mapping.decorator';

@onClass
export default class UploadPage {

  @PostMapping("/upload")
  uploadFromLib(req, res) {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      res.end("Uploaded: " + JSON.stringify(files));
    })
  }

  @upload
  @PostMapping("/upload2")
  uploadFromDecorator(req, res) {
    log(req.files)
    res.end("Uploaded!");
  }


  @GetMapping("/form")
  form(req, res) {
    res.render("upload");
  }
}