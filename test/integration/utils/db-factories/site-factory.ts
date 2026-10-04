import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { Site } from "../../../../src/domains/models/site.model";

type SiteOverrides = {
  code?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
};

export async function createDBSite(overrides: SiteOverrides = {}) {
  const site = await Site.create({
    id: randomUUID(),
    code: overrides.code ?? `SITE-${faker.string.alphanumeric(6).toUpperCase()}`,
    region: overrides.region ?? faker.location.state(),
    latitude: overrides.latitude ?? faker.location.latitude(),
    longitude: overrides.longitude ?? faker.location.longitude(),
  });

  return site;
}

