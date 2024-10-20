import LanguageController from "../controller/language.controller";
import BaseRouter from "./BaseRouter";
import validation from "../middleware/validation";
import {languagePayload} from "../validator/language.validator";

class LanguageRouter extends BaseRouter {
    routes() {
        this.router.post('/new', validation(languagePayload), LanguageController.create);
        this.router.get('/:id', LanguageController.getOne)
        this.router.get('/', LanguageController.all)
        this.router.put('/:id', validation(languagePayload), LanguageController.update)
        this.router.delete('/:id', LanguageController.delete)
    }

}

export default new LanguageRouter().router;
