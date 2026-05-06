import { Factory } from "../../../pom/interfaces/Factory";
import { User } from "../User";
import { faker } from "@faker-js/faker";
import { Country, Sex } from "../constants/UserConstants";

export class UserFactory implements Factory<User> {
    create(): User {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return User.Builder.setFullName(`${firstName} ${lastName}`)
            .setSex(faker.helpers.enumValue(Sex))
            .setEmail(`${Date.now()}_${faker.internet.email()}`)
            .setPassword(faker.internet.password())
            .setAddressFirstName(firstName)
            .setAddressLastName(lastName)
            .setCountry(faker.helpers.enumValue(Country))
            .setAddress(faker.location.streetAddress())
            .setState(faker.location.state())
            .setCity(faker.location.city())
            .setZipCode(faker.location.zipCode())
            .setPhoneNumber(faker.phone.number())
            .build();
    }
}