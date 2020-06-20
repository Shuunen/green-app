import { i18n } from '@/plugins/i18n'

export const showError = async (error) => {
  const message = typeof error === 'string' ? error : error.message
  // TODO: better test than include dot to detect a i18n key
  const code = (message && message.includes('.')) ? message : 'error.unknown'
  alert({
    title: i18n.t('error.alert-title'),
    message: i18n.t(code), // + '\n\n' + i18n.t('error.alert-message-suffix', { code }),
    okButtonText: i18n.t('error.alert-button'),
  })
  return { ok: false, error: code }
}

export const showSuccess = async (code) => alert({
  title: i18n.t('common.success-title'),
  message: i18n.t(code),
  okButtonText: i18n.t('common.ok'),
})
