interface GoogleMapsPinIconProps {
  className?: string;
}

export default function GoogleMapsPinIcon({ className = 'w-5 h-5' }: GoogleMapsPinIconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path
        d="M24 4C17.4 4 12 9.4 12 16c0 10 12 28 12 28s12-18 12-28c0-6.6-5.4-12-12-12z"
        fill="#EA4335"
      />
      <circle cx="24" cy="16" r="5" fill="#B31412" />
    </svg>
  );
}
