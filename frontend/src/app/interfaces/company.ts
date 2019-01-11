export enum Field {
    IT,
    Telecommunication,
    Energetics,
    CivilArchitecture,
    MechanicalEngineering
}

export interface Company {
    username: String,
    password: String,
    name: String,
    city: String,
    address: String,
    executive: String,
    taxid: Number,
    employees: Number,
    mail: String,
    site: String,
    field: Field,
    specialty: String,
    logo: String
}
