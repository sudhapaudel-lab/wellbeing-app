import SafetyDisclaimer from './SafetyDisclaimer';
import CrisisSupport from './CrisisSupport';

export default function SafetySection() {
  return (
    <section className="py-16 px-4" id="safety">
      <div className="max-w-7xl mx-auto">
        <hr className="petal-divider" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SafetyDisclaimer />
          <CrisisSupport />
        </div>
      </div>
    </section>
  );
}
