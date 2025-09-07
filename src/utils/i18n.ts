import i18n, { t }  from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      'projects/electronics-study': 'Electronics Study',
      'projects/electronics-study-list': 'List of logs',
      'recent-list': 'Recent Posts',
      'blog': 'Journal',
      'blog-latest': 'Latest Journal',
      'blog-list': 'List of Journals',
      'blog-prev': 'Older Journal',
      'blog-next': 'Newer Journal',
    }
  },
  ja: {
    translation: {
      'projects/electronics-study': '電子工作の勉強',
      'projects/electronics-study-list': '電子工作の勉強',
      'recent-list': '最近のポスト',
      'blog': '日記',
      'blog-latest': '最新の日記',
      'blog-list': '日記',
      'blog-prev': '古い日記',
      'blog-next': '新しい日記',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false
    }
  });

export { useTranslation }
