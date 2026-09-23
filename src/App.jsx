import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Download,
  FileText,
  GitBranch,
  Mail,
  Moon,
  Phone,
  QrCode,
  Sun,
  X,
} from 'lucide-react'
import { siteConfig } from './config/siteConfig'
import './App.css'

const iconMap = {
  linkedin: BriefcaseBusiness,
  github: GitBranch,
  file: FileText,
  code: Code2,
  mail: Mail,
  phone: Phone,
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.8} />
      ) : (
        <Moon size={18} strokeWidth={1.8} />
      )}
    </button>
  )
}

function Profile() {
  const { profile } = siteConfig

  return (
    <header className="profile">
      <div className="photo-frame">
        <img src={profile.photo} alt={profile.photoAlt} />
      </div>

      <h1>{profile.name}</h1>

      <p className="experience">
        {profile.previous.map((phrase, index) => (
          <span className="experience-phrase" key={phrase}>
            {index > 0 && (
              <span className="experience-separator">•</span>
            )}

            <span className="experience-nowrap">
              {phrase}
            </span>
          </span>
        ))}
      </p>

      <p className="education">
        {profile.education}
      </p>
    </header>
  )
}

function LinkCard({ link }) {
  const Icon = iconMap[link.icon] || ArrowUpRight

  const attributes = link.external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <a
      className="link-card"
      href={link.url}
      {...attributes}
    >
      <span className="link-icon">
        <Icon size={19} strokeWidth={1.8} />
      </span>

      <span className="link-copy">
        <strong>{link.label}</strong>
        <span>{link.description}</span>
      </span>

      <ArrowUpRight
        className="link-arrow"
        size={18}
        strokeWidth={1.7}
      />
    </a>
  )
}

function LinkList() {
  const { links, features } = siteConfig

  const visibleLinks = links.filter((link) => {
    if (!link.enabled) return false

    if (link.id === 'phone' || link.id === 'email') {
      return false
    }

    if (link.id === 'resume' && !features.showResume) {
      return false
    }

    return true
  })

  return (
    <div className="link-list">
      {visibleLinks.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
        />
      ))}
    </div>
  )
}

function QrCodeModal({ onClose, onOpenQrImage }) {
  const [qrData, setQrData] = useState('')

  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const triggerRef = useRef(document.activeElement)

  const qrUrl =
    siteConfig.site.url ||
    `${window.location.origin}${window.location.pathname}`

  useEffect(() => {
    closeButtonRef.current?.focus()

    QRCode.toDataURL(qrUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: '#11120f',
        light: '#ffffff',
      },
    }).then(setQrData)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable =
          dialogRef.current.querySelectorAll(
            'button, a[href]'
          )

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault()
          last.focus()
        }

        if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [onClose, qrUrl])

  const isAppleMobile =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1
    )

  const downloadQr = () => {
    if (isAppleMobile) {
      onOpenQrImage()
      return
    }

    const link = document.createElement('a')

    link.href = qrData
    link.download = 'kongkham-luangkhot-qr.png'
    link.click()
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className="qr-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-title"
      >
        <button
          className="icon-button modal-close"
          type="button"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close QR code dialog"
        >
          <X size={19} />
        </button>

        <div className="dialog-kicker">
          <QrCode size={16} />
          Share this card
        </div>

        <h2 id="qr-title">
          Scan to connect
        </h2>

        <p className="dialog-copy">
          Keep this card close for an easy introduction.
        </p>

        <div className="qr-image-wrap">
          {qrData ? (
            <img
              src={qrData}
              alt={`QR code for ${qrUrl}`}
            />
          ) : (
            <span className="qr-loading">
              Preparing code...
            </span>
          )}
        </div>

        <code className="qr-url">
          {qrUrl}
        </code>

        <button
          className="primary-button download-button"
          type="button"
          onClick={downloadQr}
          disabled={!qrData}
        >
          <Download size={17} />

          {isAppleMobile
            ? 'View QR code'
            : 'Download QR code'}
        </button>
      </div>
    </div>
  )
}

function QrImageView({ qrData, onClose }) {
  useEffect(() => {
    const handlePopState = () => {
      onClose()
    }

    window.addEventListener(
      'popstate',
      handlePopState
    )

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      )
    }
  }, [onClose])

  return (
    <div className="qr-fullscreen">
      <button
        className="icon-button theme-toggle"
        type="button"
        onClick={onClose}
        aria-label="Close QR code"
      >
        <X size={22} />
      </button>

      <img
        src={qrData}
        alt={`QR code for ${siteConfig.site.url || 'this website'}`}
      />
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem('contact-card-theme') ||
      siteConfig.appearance.defaultTheme
  )

  const [showQr, setShowQr] = useState(false)
  const [qrImage, setQrImage] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    localStorage.setItem(
      'contact-card-theme',
      theme
    )

    document.title = siteConfig.site.title
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) =>
      current === 'dark' ? 'light' : 'dark'
    )
  }

  const emailLink =
    siteConfig.links.find(
      (link) => link.id === 'email'
    )?.url ||
    `mailto:${siteConfig.contact.email}`

  const phoneLink =
    siteConfig.links.find(
      (link) => link.id === 'phone'
    )?.url ||
    `tel:${siteConfig.contact.phone}`

  const openQrImage = async () => {
    setShowQr(false)
    const isDark = theme === 'dark'

    const qrUrl =
        siteConfig.site.url ||
        `${window.location.origin}${window.location.pathname}`

    const qrData = await QRCode.toDataURL(qrUrl, {
        width: 480,
        margin: 2,
        color: {
        dark: isDark ? '#ffffff' : '#11120f',
        light: isDark ? '#11120f' : '#ffffff',
        },
    })
    setQrImage(qrData)

    window.history.pushState(
      { qrCode: true },
      '',
      '#qr-code'
    )
  }

  const closeQrImage = () => {
    setQrImage('')

    if (window.location.hash === '#qr-code') {
      window.history.back()
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient-line ambient-line-one" />
      <div className="ambient-line ambient-line-two" />

      <ThemeToggle
        theme={theme}
        onToggle={toggleTheme}
      />

      <div className="content-column">
        <Profile />

        <LinkList />

        {siteConfig.features.showLetsConnect && (
          <div className="contact-actions">
            {siteConfig.features.showEmail && (
              <a
                className="primary-button contact-action"
                href={emailLink}
              >
                <Mail size={18} />
                Email
              </a>
            )}

            {siteConfig.features.showPhone && (
              <a
                className="secondary-button contact-action"
                href={phoneLink}
              >
                <Phone size={18} />
                Call
              </a>
            )}
          </div>
        )}

        {siteConfig.features.showQrCode && (
          <button
            className="secondary-button qr-button"
            type="button"
            onClick={() => setShowQr(true)}
          >
            <QrCode size={17} />
            Generate QR code
          </button>
        )}

        {siteConfig.features.showFooter && (
          <footer>
            © 2026 {siteConfig.profile.name}
          </footer>
        )}
      </div>

      {showQr && (
        <QrCodeModal
          onClose={() => setShowQr(false)}
          onOpenQrImage={openQrImage}
        />
      )}

      {qrImage && (
        <QrImageView
          qrData={qrImage}
          onClose={closeQrImage}
        />
      )}
    </main>
  )
}

export default App