import FooterDisclaimer from './FooterDisclaimer';
import FooterLinks from './FooterLinks';
import FooterCopyright from './FooterCopyright';

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{
        borderColor: 'var(--melo-border)',
        background: 'rgba(242,237,228,0.6)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <FooterDisclaimer />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <FooterLinks />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
}
