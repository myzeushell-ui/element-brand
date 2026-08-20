import { SITE_URL, company } from "@/lib/config";

/**
 * Структурированные данные: Organization + WebSite + WebPage.
 * Без Product/Offer/AggregateRating/Review — данных для них нет.
 */
export function JsonLd() {
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.legalName,
    alternateName: company.brand,
    url: SITE_URL,
    email: company.email,
    identifier: { "@type": "PropertyValue", propertyID: "ИНН", value: company.inn },
    ...(company.phone
      ? { contactPoint: { "@type": "ContactPoint", telephone: company.phone, contactType: "sales" } }
      : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${company.brand} — газопоршневые установки`,
    inLanguage: "ru-RU",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Газопоршневые установки 65–230 кВт для предприятий | ЭЛЕМЕНТ",
    description:
      "Газопоршневые установки ЭЛЕМЕНТ мощностью 65, 145, 210 и 230 кВт для собственной генерации электроэнергии.",
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  const graph = { "@context": "https://schema.org", "@graph": [org, website, webpage] };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
