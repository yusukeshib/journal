import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      untitled: 'Untitled',
      'ongoing-projects': 'Ongoing Projects',
      'latest-journal': 'Latest Journal',
      'list-of-journals': 'List of Journals',
      'old-journal': 'Older Journal',
      'new-journal': 'Newer Journal',
    }
  },
  ja: {
    translation: {
      untitled: '無題',
      'ongoing-projects': '進行中のプロジェクト',
      'latest-journal': '最新の日記',
      'list-of-journals': '日記一覧',
      'old-journal': '古い日記',
      'new-journal': '新しい日記',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ja",
    interpolation: {
      escapeValue: false
    }
  });

export const t = i18n.t;
