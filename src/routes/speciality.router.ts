import SpecialityController from "../controller/speciality.controller";
import BaseRouter from "./BaseRouter";
import validation from "../middleware/validation";
import {specialityPayload} from "../validator/speciality.validator";

class SpecialityRouter extends BaseRouter {
    routes() {
        this.router.post('/new', validation(specialityPayload), SpecialityController.create);
        this.router.get('/:id', SpecialityController.getOne)
        this.router.get('/', SpecialityController.all)
        this.router.put('/:id', validation(specialityPayload), SpecialityController.update)
        this.router.delete('/:id', SpecialityController.delete)
    }

}

export default new SpecialityRouter().router;
