import { faker } from "@faker-js/faker";

export interface FakeDataUtilsInterface {
  GetName(prefix?: string): string;
}

export const fakeData: FakeDataUtilsInterface = {
  GetName(prefix?: string): string {
    const baseName = (prefix ?? "DOCUMENT").toUpperCase();
    const uuid = faker.string
      .uuid()
      .replace(/-/g, "")
      .slice(0, 12)
      .toUpperCase();
    return `${baseName}_${uuid}`;
  },
};
