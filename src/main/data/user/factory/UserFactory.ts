import { Factory } from "../../../pom/interfaces/Factory";
import { User } from "../User";
import { faker } from "@faker-js/faker"


export class UserFactory implements Factory<User>{
    create(): User {
        const validPrefixes = ["Mr", "Mrs"];
        const validCountries = ["India", "United States", "Canada", "Australia", "Israel", "New Zealand", "Singapore"];
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return User.Builder.setFullName(`${firstName} ${lastName}`)
        .setSex(faker.helpers.arrayElement(validPrefixes))
        .setEmail(faker.internet.email())
        .setPassword(faker.internet.password())
        .setAddressFirstName(firstName)
        .setAddressLastName(lastName)
        .setCountry(faker.helpers.arrayElement(validCountries))
        .setAddress(faker.location.streetAddress())
        .setState(faker.location.state())
        .setCity(faker.location.city())
        .setZipCode(faker.location.zipCode())
        .setPhoneNumber(faker.phone.number())
        .build();
    }
    
}