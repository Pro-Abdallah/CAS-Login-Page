import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import logoImg from '../assets/elsewedy-logo.png'

export default function IntroSequence({ onComplete, duration = 3000 }) {
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(onComplete, duration)
    return () => clearTimeout(timerRef.current)
  }, [onComplete, duration])

  const skip = () => {
    clearTimeout(timerRef.current)
    onComplete()
  }

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(12px)',
        transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#080809',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        cursor: 'pointer',
      }}
      onClick={skip}
      aria-label="Brand intro — click to skip"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,16,46,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
        style={{
          width: 'clamp(240px, 45vw, 480px)',
          aspectRatio: '16 / 9',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, #1A1A22 0%, #111115 100%)',
          border: '1px solid rgba(200,16,46,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <LogoPlaceholder animated />
        <span
          style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Brand GIF goes here
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] } }}
        style={{ marginTop: '32px', textAlign: 'center' }}
      >
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '22px', fontWeight: 700, letterSpacing: '-0.01em' }}>
          Elsewedy Electrometer
        </p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginTop: '6px', letterSpacing: '0.06em' }}>
          CAS Portal
        </p>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, transition: { duration: duration / 1000, ease: 'linear' } }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--brand-red)',
          transformOrigin: 'left',
        }}
      />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.4 } }}
        whileHover={{ opacity: 1 }}
        onClick={(e) => { e.stopPropagation(); skip() }}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          padding: '8px 12px',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
      >
        Skip →
      </motion.button>
    </motion.div>
  )
}

function LogoPlaceholder({ animated = false }) {
  return (
    <motion.div
      animate={animated ? { scale: [1, 1.05, 1] } : {}}
      transition={animated ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <img
        src={logoImg}
        alt="Elsewedy Electrometer"
        style={{
          height: '68px',
          width: 'auto',
          display: 'block',
          filter: 'brightness(1.6) contrast(1.1)',
        }}
      />
    </motion.div>
  )
}

export { LogoPlaceholder }
