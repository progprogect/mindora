import { accountEn, accountRu } from './chunks/account'
import { appEn, appRu } from './chunks/app'
import { authEn, authRu } from './chunks/auth'
import { chromeEn, chromeRu } from './chunks/chrome'
import { errorsEn, errorsRu } from './chunks/errors'
import { lmsEn, lmsRu } from './chunks/lms'

export const en = {
  ...chromeEn,
  ...authEn,
  ...accountEn,
  ...appEn,
  ...lmsEn,
  ...errorsEn,
}

export const ru = {
  ...chromeRu,
  ...authRu,
  ...accountRu,
  ...appRu,
  ...lmsRu,
  ...errorsRu,
}

export type MessageKey =
  | keyof typeof chromeEn
  | keyof typeof authEn
  | keyof typeof accountEn
  | keyof typeof appEn
  | keyof typeof lmsEn
  | keyof typeof errorsEn
