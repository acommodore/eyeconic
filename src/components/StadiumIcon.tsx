export function StadiumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 14C4 17.3137 7.58172 20 12 20C16.4183 20 20 17.3137 20 14" />
      <path d="M4 14C4 10.6863 7.58172 8 12 8C16.4183 8 20 10.6863 20 14" />
      <path d="M4 14V16C4 19.3137 7.58172 22 12 22C16.4183 22 20 19.3137 20 16V14" />
      <path d="M10 21.5V17H14V21" />
      <polygon points="6,4 9,5.5 6,7" fill="currentColor" stroke="none" />
      <polygon points="11,3 14,4.5 11,6" fill="currentColor" stroke="none" />
      <polygon points="16,4 19,5.5 16,7" fill="currentColor" stroke="none" />
    </svg>
  );
}
