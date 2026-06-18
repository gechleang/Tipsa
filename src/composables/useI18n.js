import { computed } from 'vue'
import { useAppStore } from './useAppStore'
import { translations } from '../i18n/translations'

function lookupKey(dictionary, key) {
  return key.split('.').reduce((acc, chunk) => {
    if (acc && typeof acc === 'object' && chunk in acc) {
      return acc[chunk]
    }
    return null
  }, dictionary)
}

export function useI18n() {
  const { state, setLanguage } = useAppStore()

  const language = computed(() => state.language)
  const dictionary = computed(() => translations[language.value] || translations.en)

  function t(key, fallback = key) {
    return lookupKey(dictionary.value, key) || lookupKey(translations.en, key) || fallback
  }

  return {
    language,
    t,
    setLanguage,
  }
}
