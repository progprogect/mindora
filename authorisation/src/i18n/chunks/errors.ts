export const errorsEn = {
  'errors.invalid_payload': 'Invalid payload',
  'errors.not_authenticated': 'Not authenticated',
  'errors.rate_limited':
    'Login Attempt Rate Limit Exceeded - For Security Your Account is Temporarily Locked. Please Wait 1 Hour and Try Again. If this error continues please contact our support team support@mindoraacademy.com',
  'errors.failed_send_code': 'Failed to send code',
  'errors.invalid_or_expired_code': 'Invalid or expired code. Please try again.',
  'errors.failed_create_user': 'Failed to create user',
  'errors.billing_not_configured': 'Billing is not configured on this environment.',
  'errors.no_billing_customer': 'No billing customer is linked to this account yet.',
  'errors.billing_portal_unavailable': 'Could not open the billing portal.',
  'errors.no_stripe_subscription':
    "No Stripe subscription is linked to this account. Cancel isn't available until billing is connected.",
  'errors.subscription_cancel_failed': 'Stripe could not cancel this subscription.',
  'errors.unknown_offer': 'Unknown offer.',
  'errors.offer_not_chargeable':
    'This offer cannot be charged yet. Continue without it for now — you can add it later, and nothing is lost.',
  'errors.annual_upgrade_unavailable':
    'This annual upgrade is not available yet. Keep your monthly plan for now — you can switch later, and nothing is lost.',
  'errors.no_email_on_account': 'No email on this account.',
  'errors.could_not_create_billing_customer': 'Could not create a billing customer.',
  'errors.checkout_session_no_url': 'Checkout session has no URL.',
  'errors.no_saved_card':
    'We do not have a saved card on this account. Keep your monthly plan for now.',
  'errors.no_active_subscription':
    'No active subscription is linked to this account yet. Keep your monthly plan for now.',
  'errors.charge_failed': 'Charge failed',
  'errors.switch_annual_failed': 'Annual switch failed',
  'errors.thread_not_found': 'Thread not found',
  'errors.could_not_start_chat': 'Could not start chat',
  'errors.not_found': 'Not found',
  'errors.forbidden': 'Forbidden',
} as const

export const errorsRu = {
  'errors.invalid_payload': 'Некорректные данные запроса',
  'errors.not_authenticated': 'Вы не авторизованы',
  'errors.rate_limited':
    'Превышен лимит попыток входа — в целях безопасности аккаунт временно заблокирован. Подождите 1 час и попробуйте снова. Если ошибка повторяется, напишите в поддержку: support@mindoraacademy.com',
  'errors.failed_send_code': 'Не удалось отправить код',
  'errors.invalid_or_expired_code': 'Неверный или просроченный код. Попробуйте ещё раз.',
  'errors.failed_create_user': 'Не удалось создать пользователя',
  'errors.billing_not_configured': 'Оплата на этом окружении не настроена.',
  'errors.no_billing_customer': 'К этому аккаунту ещё не привязан платёжный профиль.',
  'errors.billing_portal_unavailable': 'Не удалось открыть портал оплаты.',
  'errors.no_stripe_subscription':
    'К аккаунту не привязана подписка Stripe. Отмена станет доступна после подключения оплаты.',
  'errors.subscription_cancel_failed': 'Stripe не смог отменить подписку.',
  'errors.unknown_offer': 'Неизвестное предложение.',
  'errors.offer_not_chargeable':
    'Это предложение пока нельзя оплатить. Продолжайте без него — вы сможете добавить его позже, ничего не потеряется.',
  'errors.annual_upgrade_unavailable':
    'Годовой апгрейд пока недоступен. Оставьте месячный план — переключиться можно будет позже, ничего не потеряется.',
  'errors.no_email_on_account': 'У этого аккаунта нет email.',
  'errors.could_not_create_billing_customer': 'Не удалось создать платёжный профиль.',
  'errors.checkout_session_no_url': 'У сессии оплаты нет URL.',
  'errors.no_saved_card': 'У нас нет сохранённой карты для этого аккаунта. Пока оставьте месячный план.',
  'errors.no_active_subscription':
    'К аккаунту ещё не привязана активная подписка. Пока оставьте месячный план.',
  'errors.charge_failed': 'Не удалось списать оплату',
  'errors.switch_annual_failed': 'Не удалось перейти на годовой план',
  'errors.thread_not_found': 'Чат не найден',
  'errors.could_not_start_chat': 'Не удалось начать чат',
  'errors.not_found': 'Не найдено',
  'errors.forbidden': 'Доступ запрещён',
} as const
