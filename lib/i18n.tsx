"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "bg";

type Dict = Record<string, { en: string; bg: string }>;

/**
 * All UI strings live here. To add a new translatable string, add a key with
 * both {en} and {bg} entries, then call useT() to read it in any component.
 */
export const dict: Dict = {
  /* Navbar */
  "nav.viperMedia": { en: "Viper Media", bg: "Випър Медия" },
  "nav.contactUs": { en: "Contact Us", bg: "Свържи се" },
  "nav.portfolio": { en: "Portfolio", bg: "Портфолио" },
  "nav.showreel": { en: "Showreel", bg: "Шоурийл" },
  "nav.services": { en: "Services", bg: "Услуги" },
  "nav.about": { en: "About", bg: "За нас" },

  /* Intro */
  "intro.eyebrow": {
    en: "Boutique content studio",
    bg: "Бутиково студио за съдържание",
  },
  "intro.headline.1": {
    en: "Cinematic photo and video content",
    bg: "Кинематографично фото и видео",
  },
  "intro.headline.2": {
    en: "for premium brands.",
    bg: "за премиум брандове.",
  },
  "intro.body": {
    en: "We partner with bold consumer, fashion, and lifestyle labels to translate identity into visuals worth watching, sharing, and remembering — from cinematic brand films and product video to editorial photography and scroll-stopping social content.",
    bg: "Партнираме си с амбициозни брандове в консумация, мода и лайфстайл, за да превърнем идентичността им в визуални послания, които си струва да бъдат гледани, споделяни и помнени — от кинематографични брандови филми и продуктово видео до редакторска фотография и социално съдържание, което спира скрола.",
  },

  /* Stats */
  "stats.brands.label": { en: "Brands worked with", bg: "Партньорства" },
  "stats.brands.desc": {
    en: "Premium consumer, fashion and lifestyle labels.",
    bg: "Премиум брандове в консумация, мода и лайфстайл.",
  },
  "stats.views.label": { en: "Views generated", bg: "Генерирани преглеждания" },
  "stats.views.desc": {
    en: "Across Instagram, TikTok and YouTube combined.",
    bg: "Сумарно в Instagram, TikTok и YouTube.",
  },
  "stats.years.label": { en: "Years of experience", bg: "Години опит" },
  "stats.years.desc": {
    en: "Crafting cinematic content with measurable results.",
    bg: "Създаваме кинематографично съдържание с измерими резултати.",
  },
  "stats.campaigns.label": { en: "Campaigns shipped", bg: "Реализирани кампании" },
  "stats.campaigns.desc": {
    en: "From single-spot promos to ongoing content programs.",
    bg: "От единични промо клипове до постоянни съдържателни програми.",
  },

  /* Featured Work */
  "work.title": { en: "Featured Work", bg: "Избрани проекти" },
  "work.eyebrow": { en: "Selected projects", bg: "Избрани проекти" },
  "work.subhead.1": { en: "Cinematic work", bg: "Кинематографична работа" },
  "work.subhead.2": { en: "across categories.", bg: "в различни жанрове." },
  "work.intro": {
    en: "A curated cross-section of recent client work. Click any project to open the full case study.",
    bg: "Избрана селекция от скорошни клиентски проекти. Кликни върху всеки, за да отвориш пълно казъс стъди.",
  },

  /* Showreel */
  "showreel.title": { en: "Showreel", bg: "Шоурийл" },
  "showreel.body": {
    en: "A curated selection of recent work across commercials, brand films, and social content.",
    bg: "Избрана селекция от скорошни реклами, брандови филми и социално съдържание.",
  },
  "showreel.soon": { en: "Reel arriving soon", bg: "Шоурийлът пристига скоро" },
  "showreel.soonBody": {
    en: "A new showreel is in production. In the meantime, see the Featured Work below.",
    bg: "Подготвяме нов шоурийл. Междувременно разгледайте Избрани проекти по-долу.",
  },

  /* Services */
  "services.title": { en: "Services", bg: "Услуги" },
  "services.photography.title": { en: "Photography", bg: "Фотография" },
  "services.photography.desc": {
    en: "Editorial, product, and lifestyle photography that elevates visual identity and captures attention across every platform.",
    bg: "Редакторска, продуктова и лайфстайл фотография, която повдига визуалната идентичност и привлича вниманието на всяка платформа.",
  },
  "services.productVideo.title": { en: "Product Video", bg: "Продуктово видео" },
  "services.productVideo.desc": {
    en: "Cinematic product films that bring offerings to life in stunning detail and convert browsers into buyers.",
    bg: "Кинематографични продуктови филми, които оживяват предлагането в детайл и превръщат разглеждащите в купувачи.",
  },
  "services.shortForm.title": { en: "Short Form", bg: "Кратко съдържание" },
  "services.shortForm.desc": {
    en: "Scroll-stopping vertical content built for Instagram, TikTok, and YouTube Shorts — designed to grow audiences.",
    bg: "Вертикално съдържание, което спира скрола, създадено за Instagram, TikTok и YouTube Shorts — за да расте аудиторията ви.",
  },
  "services.socialContent.title": { en: "Social Content", bg: "Социално съдържание" },
  "services.socialContent.desc": {
    en: "Ongoing post, story, and campaign content tailored to each platform’s best practices and your brand voice.",
    bg: "Постоянно съдържание — постове, истории и кампании, съобразени с най-добрите практики на всяка платформа и тона на вашия бранд.",
  },

  /* Clients */
  "clients.eyebrow": { en: "Trusted by", bg: "Доверени от" },
  "clients.title": { en: "Selected clients", bg: "Избрани клиенти" },

  /* About */
  "about.title": { en: "About", bg: "За нас" },
  "about.founder": { en: "Founder — Niki Kerezov", bg: "Основател — Ники Керезов" },
  "about.bio": {
    en: "At Viper Media, we specialize in content creation and visual storytelling. Our mission is to magnify your brand's digital presence through tailor-made visuals and compelling storytelling.",
    bg: "Във Випър Медия се специализираме в създаването на съдържание и визуално разказване на истории. Мисията ни е да усилим дигиталното присъствие на вашия бранд чрез персонализирани визуални послания и завладяващи истории.",
  },
  "about.philosophy": {
    en: "Your satisfaction is our top priority. We stand behind our work with an unwavering commitment to excellence — backed by a 100% satisfaction guarantee and unlimited revisions until the content is absolutely perfect.",
    bg: "Вашето удовлетворение е нашият най-висок приоритет. Стоим зад работата си с непоколебим ангажимент към съвършенство — с 100% гаранция за удовлетворение и неограничени редакции, докато съдържанието не е перфектно.",
  },

  /* Process */
  "process.title": { en: "The Process", bg: "Процесът" },
  "process.step": { en: "Step", bg: "Стъпка" },
  "process.discovery.title": { en: "Discovery", bg: "Откриване" },
  "process.discovery.desc": {
    en: "We take the time to understand your brand's unique voice, values, and audience so the content we create truly fits.",
    bg: "Отделяме време, за да разберем уникалния глас, ценности и аудитория на вашия бранд, за да създадем съдържание, което действително пасва.",
  },
  "process.concept.title": { en: "Concept", bg: "Концепция" },
  "process.concept.desc": {
    en: "From mood boards to shot lists, we craft a detailed creative plan tailored to your platforms — Instagram, TikTok, YouTube and beyond.",
    bg: "От mood board до списък със снимки — изграждаме детайлен творчески план, съобразен с вашите платформи — Instagram, TikTok, YouTube и не само.",
  },
  "process.production.title": { en: "Production", bg: "Продукция" },
  "process.production.desc": {
    en: "Professional photography and videography, captured with care and an eye for the details that elevate your brand.",
    bg: "Професионална фотография и видеография, заснети с грижа и око за детайла, които издигат вашия бранд.",
  },
  "process.delivery.title": { en: "Delivery & Revisions", bg: "Доставка и редакции" },
  "process.delivery.desc": {
    en: "Polished edits, tailored cutdowns and unlimited revisions until the content is absolutely perfect — backed by our 100% satisfaction guarantee.",
    bg: "Изгладени монтажи, персонализирани съкратени версии и неограничени редакции, докато съдържанието не стане перфектно — с нашата 100% гаранция за удовлетворение.",
  },

  /* Testimonials */
  "testimonials.eyebrow": { en: "What clients say", bg: "Какво казват клиентите" },
  "testimonials.title": { en: "Testimonials", bg: "Отзиви" },

  /* Contact */
  "contact.eyebrow": { en: "Get in touch", bg: "Свържи се с нас" },
  "contact.title": {
    en: "Let’s start a conversation.",
    bg: "Нека започнем разговор.",
  },
  "contact.body": {
    en: "Pick the path that works best for you — jump on a quick call, or send over the details of your project.",
    bg: "Изберете подхода, който ви устройва — кратък разговор или изпратете детайли за вашия проект.",
  },
  "contact.bookCall.title": { en: "Book a Call", bg: "Запази разговор" },
  "contact.bookCall.desc": {
    en: "Grab a 30-minute slot on the calendar — we’ll walk through your goals and the right approach.",
    bg: "Запазете 30-минутен слот в календара — ще обсъдим целите ви и правилния подход.",
  },
  "contact.bookCall.cta": { en: "Open scheduler →", bg: "Отвори календара →" },
  "contact.startProject.title": { en: "Start a Project", bg: "Започни проект" },
  "contact.startProject.desc": {
    en: "Tell us about your brand and timeline. We’ll come back with a tailored proposal within 48 hours.",
    bg: "Разкажете ни за вашия бранд и сроковете. Ще се върнем с персонализирано предложение в рамките на 48 часа.",
  },
  "contact.startProject.cta": { en: "Open form →", bg: "Отвори формата →" },

  /* Footer */
  "footer.eyebrow": { en: "Boutique content studio", bg: "Бутиково студио за съдържание" },
  "footer.pitch": {
    en: "Cinematic photo and video content for premium brands. Based in Bulgaria, working with clients worldwide.",
    bg: "Кинематографично фото и видео съдържание за премиум брандове. Базирани в България, работим с клиенти по целия свят.",
  },
  "footer.contact": { en: "Get in touch", bg: "Свържи се" },
  "footer.legal.location": { en: "Sofia, Bulgaria", bg: "София, България" },
  "footer.legal.companyInfo": { en: "Company info coming soon", bg: "Информация за компанията скоро" },
  "footer.legal.rights": { en: "All rights reserved.", bg: "Всички права запазени." },
};

const Ctx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict[k]?.en ?? String(k),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("vm-lang");
    if (saved === "bg" || saved === "en") setLangState(saved);
    else if (typeof navigator !== "undefined" && navigator.language?.startsWith("bg")) {
      setLangState("bg");
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("vm-lang", l);
    } catch {}
  }, []);

  const t = useCallback(
    (key: keyof typeof dict) => dict[key]?.[lang] ?? dict[key]?.en ?? String(key),
    [lang]
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useT() {
  return useContext(Ctx).t;
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx);
  return [lang, setLang] as const;
}
