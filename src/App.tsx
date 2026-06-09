import { useState } from 'react'
import { getGuest } from './guests'
import flowerTopLeft from './assets/img/flowerLeftUpperCorner.webp'
import flowerBottomRight from './assets/img/flowerRightBottomCorner.webp'
import divider from './assets/img/divider.webp'
import locationIcon from './assets/img/location.webp'
import glassesIcon from './assets/img/glasses.webp'
import ringsIcon from './assets/img/rings.webp'
import clocheIcon from './assets/img/cloche.webp'
import {Frown} from "lucide-react";

const schedule = [
  { icon: locationIcon, title: 'Место:', lines: ['Villa Forest,', 'Свердловская 303'] },
  { icon: glassesIcon, title: 'Вэлком зона', lines: ['16:00'] },
  { icon: ringsIcon, title: 'Выездная', lines: ['регистрация', '17:00'] },
  { icon: clocheIcon, title: 'Завершение', lines: ['вечера', '23:00'] },
]

const dressCode = ['#0e0a07', '#43342a', '#6f5848', '#c6a884', '#cba893', '#7f8665', '#4c5536']

const leadClass = 'm-0 uppercase tracking-widest leading-[1.7] text-[clamp(0.85rem,2.6vw,1.1rem)]'

const ACCESS_KEY = '261bc089-5946-45ae-bb51-ebfe75066492'

type Status = 'idle' | 'sending' | 'confirmed' | 'revoking' | 'error'

const guest = getGuest(new URLSearchParams(window.location.search).get('id'))

const storageKey = `rsvp:${guest.id}`

const address = guest.plural
  ? { withYou: 'с вами', you: 'вы', support: 'поддержите' }
  : { withYou: 'с тобой', you: 'ты', support: 'поддержишь' }

function App() {
  const [status, setStatus] = useState<Status>(() =>
    localStorage.getItem(storageKey) === 'accepted' ? 'confirmed' : 'idle',
  )

  async function submit(action: 'accept' | 'revoke') {
    setStatus(action === 'accept' ? 'sending' : 'revoking')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject:
            action === 'accept'
              ? `Свадьба — придёт: ${guest.name}`
              : `Свадьба — отозвано: ${guest.name}`,
          guest_id: guest.id,
          guest_name: guest.name,
          action,
        }),
      })
      const data = await res.json()
      if (data.success) {
        if (action === 'accept') {
          localStorage.setItem(storageKey, 'accepted')
          setStatus('confirmed')
        } else {
          localStorage.removeItem(storageKey)
          setStatus('idle')
        }
      } else {
        setStatus(action === 'accept' ? 'error' : 'confirmed')
      }
    } catch {
      setStatus(action === 'accept' ? 'error' : 'confirmed')
    }
  }

  const primaryLabel: Record<Status, string> = {
    idle: guest.plural ? "Мы придём" : "Я приду",
    sending: 'Отправляем…',
    confirmed: 'Согласие отправлено ✓',
    revoking: 'Согласие отправлено ✓',
    error: 'Не вышло — попробовать ещё раз',
  }

  const busy = status === 'sending' || status === 'revoking'
  const accepted = status === 'confirmed' || status === 'revoking'

  return (
    <div className="relative flex min-h-screen w-full justify-center overflow-hidden bg-bg px-5 py-15 pt-35 ">
      <img
        className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[clamp(280px,50vw,560px)] select-none"
        src={flowerTopLeft}
        alt=""
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[clamp(150px,34vw,230px)] select-none"
        src={flowerBottomRight}
        alt=""
        aria-hidden="true"
      />

      <main className="relative z-10 flex w-full max-w-155 flex-col items-center text-center font-serif text-inkh-fit">
        <h1 className="m-0 mb-6 font-script  text-3xl font-normal leading-relaxed text-ink-strong">
          {guest.title}
        </h1>

        <p className={leadClass}>
          Мы будем счастливы разделить
          <br />{address.withYou} радость нашего дня!
        </p>

        <img className="my-7 h-auto w-[clamp(150px,50%,230px)] object-contain opacity-90" src={divider} alt="" aria-hidden="true" />

        <p className="m-0 mb-9 font-bold uppercase tracking-widest text-xl text-ink-strong">
          6 августа 2026 года
        </p>

        <section className="flex w-full items-stretch justify-center">
          {schedule.map((item, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center px-2 [&+&]:border-l border-line/55"
            >
              <img className="mb-4 h-[clamp(34px,9vw,48px)] w-[clamp(34px,9vw,48px)] object-contain" src={item.icon} alt="" aria-hidden="true" />
              <p className="m-0 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                {item.title}
              </p>
              {item.lines.map((line, j) => (
                <p key={j} className="m-0 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </section>

        <div className="my-9 flex items-center gap-4">
          <span className="block h-px w-[clamp(40px,12vw,70px)] bg-line" />
          <span className="uppercase tracking-widest text-md text-ink-strong">
            Дресс-код
          </span>
          <span className="block h-px w-[clamp(40px,12vw,70px)] bg-line" />
        </div>

        <p className={leadClass}>
          Мы будем очень рады, если {address.you}
          <br />{address.support} цветовую гамму праздника:
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {dressCode.map((color) => (
            <span
              key={color}
              className="h-[clamp(34px,8vw,36px)] w-[clamp(34px,8vw,36px)] rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <img className="my-7 h-auto w-[clamp(150px,50%,230px)] object-contain opacity-90" src={divider} alt="" aria-hidden="true" />

        <p className="m-0 mb-9 font-script text-ink-strong">
          <span className="block text-2xl">С любовью,</span>
          <span className="block text-2xl">Виктор и Дарья</span>
        </p>

        <div className="flex flex-col items-center gap-3" aria-live="polite">
          <button
            type="button"
            onClick={() => submit('accept')}
            disabled={busy || accepted}
            className="cursor-pointer rounded-full border-none bg-ink-strong px-21 py-3.5 font-serif uppercase tracking-widest text-md text-bg duration-200 hover:bg-ink focus-visible:outline focus-visible:outline-offset-[3px] focus-visible:outline-ink-strong active:translate-y-px transition-all disabled:cursor-default disabled:bg-line disabled:hover:bg-line"
          >
            {primaryLabel[status]}
          </button>

          {accepted && (
            <button
              type="button"
              onClick={() => submit('revoke')}
              disabled={status === 'revoking'}
              className="flex gap-2 items-center cursor-pointer border-none bg-transparent font-serif text-sm uppercase tracking-wider text-ink underline underline-offset-4 transition-opacity hover:opacity-70 disabled:cursor-default disabled:opacity-50"
            >
              {status === 'revoking' ? 'Отменяем… Жалко конечно…' : <>
                Отменить участие
                <Frown strokeWidth={1.2}/>
              </>}
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
