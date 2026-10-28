import fs from 'fs';
import path from 'path';

const RU_DIR = path.join(
  process.cwd(),
  'authorisation/src/content/courses/ru'
);
const EN_DIR = path.join(
  process.cwd(),
  'authorisation/src/content/courses'
);

const FILES = [
  'positioning-marketing-acquisition.json',
  'design-your-business-model.json',
  'ai-automation-blueprint.json',
  'everyday-movement.json',
  'execution-founder-productivity.json',
  'sales-persuasion-negotiation.json',
  '28-day-ai-challenge.json',
  'entrepreneurial-mindset.json',
  'ai-productivity-system.json',
  'master-ai-powerpoint.json',
  'pricing-monetisation-mastery.json',
  'systems-delegation-operations.json',
  '28-day-success-mindset.json',
];

function collectStrings(obj, out = []) {
  if (typeof obj === 'string') {
    out.push(obj);
    return out;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) collectStrings(v, out);
    return out;
  }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      if (k === 'id' || k === 'slug') continue;
      collectStrings(obj[k], out);
    }
  }
  return out;
}

function countChanged(before, after) {
  const a = collectStrings(before);
  const b = collectStrings(after);
  let n = 0;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) n++;
  }
  return n;
}

function applyReplacements(text) {
  if (typeof text !== 'string' || !text) return text;
  let s = text;

  const rules = [
    [/Bullseye Framework/g, 'мишень каналов (Bullseye)'],
    [/lifecycle-цепочки/g, 'цепочки жизненного цикла'],
    [/growth-команда/g, 'команда роста'],
    [/North Star Metric/g, 'метрика Полярной звезды'],
    [/growth-эксперименты/g, 'эксперименты роста'],
    [/build-measure-learn/gi, '«создай — измерь — научись»'],
    [/product-market fit/gi, 'соответствие продукта рынку'],
    [/go-to-market/gi, 'выход на рынок'],
    [/Lean Canvas/g, 'бережливый холст (Lean Canvas)'],
    [/No-code/g, 'без кода'],
    [/no-code/g, 'без кода'],
    [/Workflow/g, 'рабочий процесс'],
    [/workflow/g, 'рабочий процесс'],
    [/Webhooks/g, 'вебхуки'],
    [/Webhooks/g, 'вебхуки'],
    [/Fastlane/g, 'быстрая дорожка'],
    [/Slowlane/g, 'медленная дорожка'],
    [/Buyback Rate/g, 'ставка выкупа времени'],
    [/Buyback Principle/g, 'принцип выкупа времени'],
    [/Key Results/g, 'ключевые результаты'],
    [/Freemium/g, 'бесплатная база'],
    [/Good-Better-Best/g, 'линейка «хорошо — лучше — лучше всего»'],
    [/vanity metrics/gi, 'метрики тщеславия'],
    [/vanity metric/gi, 'метрика тщеславия'],
    [/vanity-метрик/gi, 'метрик тщеславия'],
    [/Pipeline/g, 'цепочка'],
    [/pipeline/g, 'цепочка'],
    [/follow-through/gi, 'доведение до результата'],
    [/follow-up/gi, 'повторные письма'],
    [/self-orientation/gi, 'самоориентация (self-orientation)'],
    [/Need-Payoff/g, 'выгода потребности (Need-Payoff)'],
    [/Accusation Audit/g, 'аудит обвинений (Accusation Audit)'],
    [/reciprocity/gi, 'взаимность (reciprocity)'],
    [/multi-step workflow/gi, 'многошаговый рабочий процесс'],
    [/Multi-step workflow/gi, 'Многошаговый рабочий процесс'],
    [/«bumping this»/g, '«просто напоминаю»'],
    [/bumping this/g, 'просто напоминаю'],
    [/compliance/gi, 'согласие'],
    [/waitlist/gi, 'лист ожидания'],
    [/headcount/g, 'численность персонала'],
    [/high-value/gi, 'высокой ценности'],
    [/low-value/gi, 'низкой ценности'],
    [/high-leverage/gi, 'высокого рычага'],
    [/moonshot/gi, 'амбициозная цель'],
    [/roofshots/gi, 'обязательные цели'],
    [/accountability/gi, 'ответственность'],
    [/scorecard/gi, 'табло'],
    [/Lag measures/g, 'запаздывающие метрики'],
    [/Lead measures/g, 'опережающие метрики'],
    [/lag measures/g, 'запаздывающие метрики'],
    [/lead measures/g, 'опережающие метрики'],
    [/DRIP Matrix/g, 'матрица DRIP'],
  ];

  for (const [re, rep] of rules) {
    s = s.replace(re, rep);
  }
  return s;
}

function walkReplace(obj) {
  if (typeof obj === 'string') return applyReplacements(obj);
  if (Array.isArray(obj)) return obj.map(walkReplace);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) {
      if (k === 'id' || k === 'slug') out[k] = obj[k];
      else out[k] = walkReplace(obj[k]);
    }
    return out;
  }
  return obj;
}

/** Fix sales lessons spn-3+ where fields shifted one step */
function fixShiftedSpnLesson(lesson, enLesson) {
  if (!lesson.cards?.length) return lesson;
  const hook = lesson.cards.find((c) => c.type === 'hook');
  const contents = lesson.cards.filter((c) => c.type === 'content');
  const tryIt = lesson.cards.find((c) => c.type === 'try-it');
  if (!hook || !tryIt || !lesson.quiz?.length) return lesson;

  const oldTitle = lesson.title;
  const oldSubtitle = lesson.subtitle;
  const oldHookH = hook.headline;
  const oldHookB = hook.body;

  lesson.title = oldSubtitle;
  lesson.subtitle = oldHookH;
  hook.headline = oldHookB;
  hook.body = contents[0]?.headline ?? hook.body;

  for (let i = 0; i < contents.length; i++) {
    const c = contents[i];
    if (i < contents.length - 1) {
      c.headline = c.body;
      c.body = contents[i + 1].headline;
    } else {
      c.headline = c.body;
      c.body = tryIt.headline;
    }
  }

  const oldTryH = tryIt.headline;
  const oldTryB = tryIt.body;
  tryIt.headline = oldTryB;
  tryIt.body = lesson.quiz[0].question;

  const oldQuiz = JSON.parse(JSON.stringify(lesson.quiz));

  for (let qi = 0; qi < lesson.quiz.length; qi++) {
    const q = lesson.quiz[qi];
    const enQ = enLesson.quiz[qi];
    const saved = oldQuiz[qi];
    if (!enQ || !saved?.options?.length) continue;

    const realQ = saved.options[0];
    const opts = saved.options.slice(1);
    if (opts.length < 4 && saved.explanation) opts.push(saved.explanation);

    q.question = realQ;
    q.options = opts.slice(0, 4);
    q.correctIndex = enQ.correctIndex;

    const nextQ = oldQuiz[qi + 1]?.question;
    if (nextQ && !nextQ.trim().endsWith('?') && nextQ.length > 40) {
      q.explanation = nextQ;
    } else if (
      saved.explanation &&
      saved.explanation.length > 30 &&
      !saved.explanation.includes('?')
    ) {
      q.explanation = saved.explanation;
    } else {
      q.explanation = ruExplanationFromEn(enQ.explanation);
    }
  }

  return lesson;
}

function ruExplanationFromEn(en) {
  const pairs = [
    [
      'Social proof is most powerful during uncertainty',
      'Социальное доказательство сильнее всего в неопределённости — мы смотрим на других, когда не знаем правильного пути.',
    ],
    [
      'Social proof works best when it comes from people similar to the prospect',
      'Социальное доказательство лучше работает, когда его дают люди, похожие на проспекта — ему нужно увидеть себя в истории успеха.',
    ],
    [
      'When someone else vouches for your expertise',
      'Когда за вашу экспертизу поручается другой, это сочетает авторитет и социальное доказательство — двойной сигнал доверия.',
    ],
    [
      'Loss aversion research consistently',
      'Исследования неприятия потерь стабильно показывают: потери ощущаются примерно вдвое сильнее эквивалентных выигрышей.',
    ],
    [
      'Manufactured urgency destroys trust',
      'Искусственная срочность разрушает доверие — после разоблачения клиенты теряют уверенность во всём, что вы говорите.',
    ],
    [
      'Cohort-based programs with genuine capacity',
      'Когорты с настоящими лимитами создают реальный, проверяемый дефицит и уважают интеллект покупателя.',
    ],
  ];
  for (const [prefix, ru] of pairs) {
    if (en.includes(prefix)) return ru;
  }
  return en;
}

function fixSpnCourse(ru, en) {
  for (const lesson of ru.lessons) {
    if (!lesson.id.startsWith('spn-') || lesson.dayNumber < 3) continue;
    const enLesson = en.lessons.find((l) => l.id === lesson.id);
    if (enLesson) fixShiftedSpnLesson(lesson, enLesson);
  }
  return ru;
}

function loadEfpPatches() {
  const patchPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'efp-lesson-patches.json');
  if (!fs.existsSync(patchPath)) return {};
  return JSON.parse(fs.readFileSync(patchPath, 'utf8'));
}

function applyEfpPatches(ru, patches) {
  for (const lesson of ru.lessons) {
    if (patches[lesson.id]) {
      Object.assign(lesson, patches[lesson.id]);
    }
  }
  return ru;
}

const results = {};

for (const file of FILES) {
  const ruPath = path.join(RU_DIR, file);
  const before = JSON.parse(fs.readFileSync(ruPath, 'utf8'));
  let data = JSON.parse(JSON.stringify(before));

  if (file === 'sales-persuasion-negotiation.json') {
    const en = JSON.parse(
      fs.readFileSync(path.join(EN_DIR, 'sales-persuasion-negotiation.json'), 'utf8')
    );
    data = fixSpnCourse(data, en);
  }

  if (file === 'execution-founder-productivity.json') {
    const patches = loadEfpPatches();
    data = applyEfpPatches(data, patches);
  }

  data = walkReplace(data);

  fs.writeFileSync(ruPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  try {
    JSON.parse(fs.readFileSync(ruPath, 'utf8'));
  } catch (e) {
    console.error('INVALID JSON', file, e.message);
    process.exit(1);
  }
  results[file] = countChanged(before, data);
}

console.log(JSON.stringify(results, null, 2));
