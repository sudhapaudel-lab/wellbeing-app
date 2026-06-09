import SectionHeader from './SectionHeader';
import BalanceCard from './BalanceCard';
import { BALANCE_FEATURES } from '../../data/BalanceData';

export default function BalanceFeatures() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Balance Tools"
          eyebrowColor="var(--melo-sage)"
          title={
            <>
              Tools to help you find{' '}
              <span className="italic" style={{ color: 'var(--melo-lavender)' }}>
                balance
              </span>
            </>
          }
          subtitle="Each tool opens in its own focused space on Balance.melo.com"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BALANCE_FEATURES.map((feat) => (
            <BalanceCard key={feat.title} {...feat} />
          ))}
        </div>
      </div>
    </section>
  );
}
