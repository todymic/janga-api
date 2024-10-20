import {faker} from "@faker-js/faker/locale/ar";

export function createLanguages(){
    return {
        "name": faker.word.sample(),
        "code": 'en'
    }
}

export function createSpecialities(){
    return {
        "name": faker.person.jobTitle()
    }
}
