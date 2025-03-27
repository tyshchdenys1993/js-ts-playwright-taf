export class User {
    private readonly sex: string;
    private readonly fullName: string;
    private readonly email: string;
    private readonly password: string;
    private readonly dayOfBirth: string;
    private readonly monthOfBirth: string;
    private readonly yearOfBirth: string;

    private readonly addressFirstName: string;
    private readonly addressLastName: string;
    private readonly addressCompany: string;
    private readonly address: string;
    private readonly country: string;
    private readonly state: string;
    private readonly city: string;
    private readonly zipCode: string;
    private readonly phoneNumber: string;
    
    static get Builder() {
        return new UserBuilder();
      }


    constructor(builder: UserBuilder) {
        this.sex = builder.sex;
        this.fullName = builder.fullName;
        this.email = builder.email;
        this.password = builder.password;
        this.dayOfBirth = builder.dayOfBirth;
        this.monthOfBirth = builder.monthOfBirth;
        this.yearOfBirth = builder.yearOfBirth;
        this.addressFirstName = builder.addressFirstName;
        this.addressLastName = builder.addressLastName;
        this.addressCompany = builder.addressCompany;
        this.address = builder.address;
        this.country = builder.country;
        this.state = builder.state;
        this.city = builder.city;
        this.zipCode = builder.zipCode;
        this.phoneNumber = builder.phoneNumber;
    }

    public getSex(): string {
        return this.sex;
    }

    public getFullName(): string {
        return this.fullName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getDayOfBirth(): string {
        return this.dayOfBirth;
    }

    public getMonthOfBirth(): string {
        return this.monthOfBirth;
    }

    public getYearOfBirth(): string {
        return this.yearOfBirth;
    }

    public getAddressFirstName(): string {
        return this.addressFirstName;
    }

    public getAddressLastName(): string {
        return this.addressLastName;
    }

    public getAddressCompany(): string {
        return this.addressCompany;
    }

    public getAddress(): string {
        return this.address;
    }

    public getCountry(): string {
        return this.country;
    }

    public getState(): string {
        return this.state;
    }

    public getCity(): string {
        return this.city;
    }

    public getZipCode(): string {
        return this.zipCode;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public toString(): string {
        return `User Info:
        Full Name: ${this.fullName}
        Sex: ${this.sex}
        Email: ${this.email}
        Date of Birth: ${this.dayOfBirth}-${this.monthOfBirth}-${this.yearOfBirth}
        Address: ${this.addressFirstName} ${this.addressLastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zipCode}, ${this.country}
        Phone: ${this.phoneNumber}`;
    }
}

class UserBuilder {
    sex: string = "";
    fullName: string = "";
    email: string = "";
    password: string = "";
    dayOfBirth: string = "";
    monthOfBirth: string = "";
    yearOfBirth: string = "";

    addressFirstName: string = "";
    addressLastName: string = "";
    addressCompany: string = "";
    address: string = "";
    country: string = "";
    state: string = "";
    city: string = "";
    zipCode: string = "";
    phoneNumber: string = "";

    setSex(sex: string) {
        this.sex = sex;
        return this;
    }

    setFullName(fullName: string) {
        this.fullName = fullName;
        return this;
    }

    setEmail(email: string) {
        this.email = email;
        return this;
    }

    setPassword(password: string) {
        this.password = password;
        return this;
    }

    setDayOfBirth(dayOfBirth: string) {
        this.dayOfBirth = dayOfBirth;
        return this;
    }

    setMonthOfBirth(monthOfBirth: string) {
        this.monthOfBirth = monthOfBirth;
        return this;
    }

    setYearOfBirth(yearOfBirth: string) {
        this.yearOfBirth = yearOfBirth;
        return this;
    }

    setAddressFirstName(addressFirstName: string) {
        this.addressFirstName = addressFirstName;
        return this;
    }

    setAddressLastName(addressLastName: string) {
        this.addressLastName = addressLastName;
        return this;
    }

    setAddressCompany(addressCompany: string) {
        this.addressCompany = addressCompany;
        return this;
    }

    setAddress(address: string) {
        this.address = address;
        return this;
    }

    setCountry(country: string) {
        this.country = country;
        return this;
    }

    setState(state: string) {
        this.state = state;
        return this;
    }

    setCity(city: string) {
        this.city = city;
        return this;
    }

    setZipCode(zipCode: string) {
        this.zipCode = zipCode;
        return this;
    }

    setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    build() {
        return new User(this);
      }
}