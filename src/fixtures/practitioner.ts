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

export function createOffices() {
    return {
        "name": faker.person.jobTitle(),
        "street": faker.location.street(),
        "city": faker.location.city(),
        "zipcode": faker.location.zipCode(),
        "country": faker.location.country()
    }
}
