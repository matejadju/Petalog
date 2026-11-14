
import { describe, expect, it } from "vitest";
import { registerSchema, loginSchema } from "../auth/schemas";
import { pluralize, formatAge } from "./animals";
import { formatAllergy } from "./allergies";

const validUser = {
  firstName: "Ana",
  lastName: "Horvat",
  email: "ana@example.com",
  password: "Geslo12345",
};

describe("US-01: Registracija uporabnika", () => {
  it("sprejme veljavne podatke", () => {
    expect(registerSchema.safeParse(validUser).success).toBe(true);
  });

  it("zavrne prazno ime", () => {
    expect(
      registerSchema.safeParse({ ...validUser, firstName: "" }).success
    ).toBe(false);
  });

  it("zavrne prazen priimek", () => {
    expect(
      registerSchema.safeParse({ ...validUser, lastName: "" }).success
    ).toBe(false);
  });

  it("zavrne neveljaven e-postni naslov", () => {
    expect(
      registerSchema.safeParse({ ...validUser, email: "napacno" }).success
    ).toBe(false);
  });

  it("zavrne prekratko geslo", () => {
    expect(
      registerSchema.safeParse({ ...validUser, password: "123" }).success
    ).toBe(false);
  });
});

describe("US-01: Prijava uporabnika", () => {
  it("sprejme veljavne prijavne podatke", () => {
    expect(
      loginSchema.safeParse({
        email: "ana@example.com",
        password: "Geslo12345",
      }).success
    ).toBe(true);
  });

  it("zavrne prazen e-postni naslov", () => {
    expect(
      loginSchema.safeParse({
        email: "",
        password: "Geslo12345",
      }).success
    ).toBe(false);
  });

  it("zavrne prazno geslo", () => {
    expect(
      loginSchema.safeParse({
        email: "ana@example.com",
        password: "",
      }).success
    ).toBe(false);
  });
});

describe("US-03: Prikaz podatkov zivaji", () => {
  const forms: [string, string, string, string] = [
    "mesec",
    "meseca",
    "meseci",
    "mesecev",
  ];

  it("pravilno izpise en mesec", () => {
    expect(pluralize(1, forms)).toBe("1 mesec");
  });

  it("pravilno izpise dva meseca", () => {
    expect(pluralize(2, forms)).toBe("2 meseca");
  });

  it("pravilno izpise tri mesece", () => {
    expect(pluralize(3, forms)).toBe("3 meseci");
  });

  it("pravilno izpise pet mesecev", () => {
    expect(pluralize(5, forms)).toBe("5 mesecev");
  });

  it("ob manjkajoci starosti izpise Ni podatka", () => {
    expect(formatAge(null)).toBe("Ni podatka");
  });
});

describe("US-06: Prikaz alergij", () => {
  it("prikaze alergen brez opisa", () => {
    expect(
      formatAllergy({
        id: 1,
        allergen: "Penicilin",
        description: null,
      })
    ).toBe("Penicilin");
  });

  it("prikaze alergen z opisom", () => {
    expect(
      formatAllergy({
        id: 1,
        allergen: "Penicilin",
        description: "Izpuščaj",
      })
    ).toBe("Penicilin – Izpuščaj");
  });
});
