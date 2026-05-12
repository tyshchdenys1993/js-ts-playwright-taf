import { Factory } from "../../../pom/interfaces/Factory";
import { User } from "../User";
import { faker } from "@faker-js/faker";
import { Country, Sex } from "../constants/UserConstants";

export type UserOverrides = {
    fullName?: string;
    sex?: string;
    email?: string;
    password?: string;
    addressFirstName?: string;
    addressLastName?: string;
    country?: string;
    address?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    phoneNumber?: string;
};

export class UserFactory implements Factory<User> {
    create(overrides: UserOverrides = {}): User {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return User.Builder
            .setFullName(overrides.fullName ?? `${firstName} ${lastName}`)
            .setSex(overrides.sex ?? faker.helpers.enumValue(Sex))
            .setEmail(overrides.email ?? `${Date.now()}_${faker.internet.email()}`)
            .setPassword(overrides.password ?? faker.internet.password())
            .setAddressFirstName(overrides.addressFirstName ?? firstName)
            .setAddressLastName(overrides.addressLastName ?? lastName)
            .setCountry(overrides.country ?? faker.helpers.enumValue(Country))
            .setAddress(overrides.address ?? faker.location.streetAddress())
            .setState(overrides.state ?? faker.location.state())
            .setCity(overrides.city ?? faker.location.city())
            .setZipCode(overrides.zipCode ?? faker.location.zipCode())
            .setPhoneNumber(overrides.phoneNumber ?? faker.phone.number())
            .build();
    }
}