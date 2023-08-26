export interface Country {
    name:         Name;
    tld?:         string[];
    cca2:         string;
    ccn3?:        string;
    cca3:         string;
    cioc?:        string;
    independent?: boolean;
    status:       Status;
    unMember:     boolean;
    currencies:   Currencies;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini?:        { [key: string]: number };
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   Region[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
}

export interface SmallCountryData {
    name:         Name;
    cca3:         string;
    borders?:     string[];
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export enum Region {
    Asia = "Asia",
    Europe = "Europe",
    America = "America",
    Oceania = "Oceania",
    Africa = "Africa",
}

export interface Currencies {
    UAH?: All;
    EUR?: All;
    NOK?: All;
    SEK?: All;
    GBP?: All;
    GGP?: All;
    ISK?: All;
    BGN?: All;
    CZK?: All;
    GIP?: All;
    RON?: All;
    RUB?: All;
    BAM?: BAM;
    PLN?: All;
    DKK?: All;
    FOK?: All;
    MDL?: All;
    RSD?: All;
    HUF?: All;
    IMP?: All;
    JEP?: All;
    BYN?: All;
    CHF?: All;
    ALL?: All;
    MKD?: All;
}

export interface All {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}
