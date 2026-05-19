import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement>

export const FacebookIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <title>Facebook</title>
    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

export const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...props}>
    <title>Instagram</title>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" />
    <path d="M17.5 6.5h.01" stroke="currentColor" />
  </svg>
)

export const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <title>LinkedIn</title>
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5V24H0zM8 8h4.8v2.2h.1c.7-1.2 2.4-2.4 4.9-2.4C22 7.8 24 10 24 14.2V24h-5v-9.2c0-2.2-.04-5-3-5-3 0-3.5 2.3-3.5 4.8V24H8V8z" />
  </svg>
)

export const TwitterIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <title>Twitter</title>
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.15 12.15 0 0 1 3.15 4.6a4.28 4.28 0 0 0 1.32 5.7c-.66-.02-1.28-.2-1.82-.5v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08a4.29 4.29 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.12 12.12 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.72 8.72 0 0 0 22.46 6z" />
  </svg>
)

export const WhatsappIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <title>WhatsApp</title>
    <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.37 0 .01 5.37.01 12c0 2.12.56 4.09 1.53 5.82L0 24l6.41-1.66A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-1.98-.48-3.84-1.48-5.52zM12 21.5c-1.8 0-3.54-.47-5.05-1.35l-.36-.21-3.8.99.99-3.7-.22-.38A9.4 9.4 0 0 1 2.5 12c0-5.24 4.26-9.5 9.5-9.5S21.5 6.76 21.5 12 17.24 21.5 12 21.5zM16.3 14.1c-.26-.13-1.53-.76-1.77-.85-.24-.09-.41-.13-.58.13s-.66.85-.81 1.03c-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.29-1.53-1.44-1.8-.15-.27-.02-.42.12-.55.12-.12.26-.31.39-.46.13-.15.18-.26.28-.43.09-.17.05-.32-.02-.45-.06-.13-.58-1.39-.8-1.9-.21-.5-.43-.43-.59-.43-.16 0-.34-.02-.52-.02-.18 0-.46.06-.7.32-.24.26-.92.9-.92 2.2 0 1.29.94 2.54 1.07 2.72.13.18 1.86 2.85 4.51 3.88 2.65 1.03 2.65.69 3.12.65.47-.04 1.53-.62 1.75-1.22.22-.6.22-1.11.15-1.22-.07-.11-.24-.17-.5-.3z" />
  </svg>
)

export const PhoneIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <title>Contact</title>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.94 21 3 14.06 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.58.12.35.04.74-.24 1.01l-2.21 2.2z" />
  </svg>
)

export default null
