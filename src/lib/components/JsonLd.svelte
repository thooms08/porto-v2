<script lang="ts">
  import type { Locale } from "$lib/i18n";
  import { t } from "$lib/i18n";
  import { siteConfig } from "$lib/data/site";
  import { projects } from "$lib/data/projects";
  import { certificates } from "$lib/data/certificates";
  import { faqs } from "$lib/data/faq";
  import { skillCategories } from "$lib/data/skills";
  import { experiences } from "$lib/data/experience";

  let { locale }: { locale: Locale } = $props();

  const allSkills = skillCategories.flatMap((c) => c.items);

  const graph = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        url: siteConfig.siteUrl,
        name: siteConfig.name,
        description: t(siteConfig.seo.description, locale),
        inLanguage: locale === "id" ? "id-ID" : "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.siteUrl}${locale === "id" ? "/id/" : "/"}#webpage`,
        url: `${siteConfig.siteUrl}${locale === "id" ? "/id/" : "/"}`,
        name: t(siteConfig.seo.title, locale),
        description: t(siteConfig.seo.description, locale),
        inLanguage: locale === "id" ? "id-ID" : "en-US",
        isPartOf: { "@id": `${siteConfig.siteUrl}/#website` },
        mainEntity: { "@id": `${siteConfig.siteUrl}/#person` },
        image: {
          "@type": "ImageObject",
          url: `${siteConfig.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.siteUrl}/#person`,
        name: siteConfig.name,
        givenName: siteConfig.firstName,
        familyName: siteConfig.lastName,
        jobTitle: t(siteConfig.role, locale),
        description: t(siteConfig.seo.description, locale),
        url: siteConfig.siteUrl,
        image: {
          "@type": "ImageObject",
          url: `${siteConfig.siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karawang",
          addressRegion: "Jawa Barat",
          addressCountry: "ID",
        },
        sameAs: [
          siteConfig.githubUrl,
          siteConfig.linkedinUrl,
          siteConfig.instagramUrl,
          siteConfig.siteUrl,
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Universitas Bina Sarana Informatika",
          sameAs: "https://bsi.ac.id",
        },
        worksFor: {
          "@type": "Organization",
          "@id": `${siteConfig.siteUrl}/#organization`,
          name: siteConfig.companyName,
        },
        founder: {
          "@type": "Organization",
          "@id": `${siteConfig.siteUrl}/#organization`,
        },
        knowsAbout: allSkills,
        knowsLanguage: ["Indonesian", "English"],
        hasOccupation: {
          "@type": "Occupation",
          name: "Fullstack Web Developer",
          description:
            "Designs and develops full-stack web applications including POS systems, HRMS, and e-commerce platforms.",
          occupationLocation: {
            "@type": "Country",
            name: "Indonesia",
          },
          skills: allSkills.join(", "),
        },
        hasCredential: certificates.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: t(c.title, locale),
          credentialCategory: c.category,
          recognizedBy: {
            "@type": "Organization",
            name: c.issuer,
          },
          validFrom: c.date,
        })),
        performerIn: experiences
          .filter((e) => e.showOnWeb)
          .map((e) => ({
            "@type": "OrganizeAction",
            name: t(e.role, locale),
            agent: { "@id": `${siteConfig.siteUrl}/#person` },
            object: {
              "@type": "Organization",
              name: e.company,
            },
          })),
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.companyName,
        url: "https://libix.tech",
        founder: { "@id": `${siteConfig.siteUrl}/#person` },
        foundingDate: "2024",
        description:
          locale === "id"
            ? "Startup digital yang berfokus pada pengembangan web dan solusi digital."
            : "Digital startup focused on web development and digital solutions.",
      },
      {
        "@type": "ItemList",
        name: locale === "id" ? "Proyek Portfolio" : "Portfolio Projects",
        itemListElement: projects
          .filter((p) => p.showOnWeb)
          .map((proj, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "WebApplication",
              name: proj.name,
              url: proj.url,
              description: t(proj.shortDesc, locale),
              applicationCategory: t(proj.category, locale),
              creator: { "@id": `${siteConfig.siteUrl}/#person` },
            },
          })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: t(f.question, locale),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(f.answer, locale),
          },
        })),
      },
    ],
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(graph)}<\/script>`}
</svelte:head>
