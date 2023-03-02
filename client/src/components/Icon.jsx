import PropTypes from 'prop-types'

import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg'
import { ReactComponent as DesktopIcon } from '../assets/icons/desktop.svg'
import { ReactComponent as DownloadIcon } from '../assets/icons/download.svg'
import { ReactComponent as EncryptIcon } from '../assets/icons/encrypt.svg'
import { ReactComponent as LoadingIcon } from '../assets/icons/loading.svg'
import { ReactComponent as LoginIcon } from '../assets/icons/login.svg'
import { ReactComponent as LogoIcon } from '../assets/icons/logo.svg'
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg'
import { ReactComponent as MarkdownIcon } from '../assets/icons/markdown.svg'
import { ReactComponent as MoonIcon } from '../assets/icons/moon.svg'
import { ReactComponent as NextIcon } from '../assets/icons/next.svg'
import { ReactComponent as PenIcon } from '../assets/icons/pen.svg'
import { ReactComponent as PrevIcon } from '../assets/icons/prev.svg'
import { ReactComponent as RocketIcon } from '../assets/icons/rocket.svg'
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg'
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'

export default function Icon({ icon }) {
  return (
    <>
      {icon === 'calendar' && <CalendarIcon />}
      {icon === 'desktop' && <DesktopIcon />}
      {icon === 'download' && <DownloadIcon />}
      {icon === 'encrypt' && <EncryptIcon />}
      {icon === 'loading' && <LoadingIcon />}
      {icon === 'login' && <LoginIcon />}
      {icon === 'logo' && <LogoIcon />}
      {icon === 'logout' && <LogoutIcon />}
      {icon === 'markdown' && <MarkdownIcon />}
      {icon === 'moon' && <MoonIcon />}
      {icon === 'next' && <NextIcon />}
      {icon === 'pen' && <PenIcon />}
      {icon === 'prev' && <PrevIcon />}
      {icon === 'rocket' && <RocketIcon />}
      {icon === 'sun' && <SunIcon />}
      {icon === 'user' && <UserIcon />}
    </>
  )
}

Icon.propTypes = {
  icon: PropTypes.oneOf([
    'calendar',
    'desktop',
    'download',
    'encrypt',
    'loading',
    'login',
    'logo',
    'logout',
    'markdown',
    'moon',
    'next',
    'pen',
    'prev',
    'rocket',
    'sun',
    'user',
  ]).isRequired,
}
