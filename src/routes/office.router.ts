import OfficeController from "../controller/office.controller";
import BaseRouter from "./BaseRouter";
import validation from "../middleware/validation";
import {officePayload} from "../validator/office.validator";

class OfficeRouter extends BaseRouter {
    routes() {

        this.router.post('/new', validation(officePayload), OfficeController.create)
        this.router.get('/', OfficeController.all)
        this.router.get('/:id', OfficeController.getOne)
        this.router.put('/:id', validation(officePayload), OfficeController.update)
        this.router.delete('/:id', OfficeController.delete)

    }
}

export default new OfficeRouter().router;
