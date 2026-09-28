const message = encodeURIComponent("Hi SurgeMatrix, I would like to discuss a project.");
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, "");
const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : `https://wa.me/?text=${message}`;

export function WhatsAppButton() {
  return <a className="whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with SurgeMatrix on WhatsApp" title="Chat with us on WhatsApp"><svg className="whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5a12.5 12.5 0 0 0-10.7 19l-1.3 5 5.1-1.3A12.5 12.5 0 1 0 16 3.5Z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M11.3 10.7c.3-.4.7-.4 1-.1l1.5 1.9c.2.3.2.7-.1 1l-.8.8c.7 1.4 1.8 2.5 3.2 3.2l.8-.8c.3-.3.7-.3 1-.1l1.9 1.5c.3.3.3.7-.1 1-1 .9-2.1 1.1-3.3.6a10.2 10.2 0 0 1-5.7-5.7c-.5-1.2-.3-2.3.6-3.3Z" fill="currentColor" /></svg><span>WhatsApp</span></a>;
}
