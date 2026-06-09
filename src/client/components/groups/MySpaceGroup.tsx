import SectionHeader from '../home/SectionHeader';
import MySpaceCard from './MySpaceCard';
import { MY_SPACE_FEATURES } from '../../data/mySpaceData';

export default function MySpaceGroup() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <hr className="petal-divider" />

        <SectionHeader
          eyebrow="My Space"
          eyebrowColor="var(--melo-mauve)"
          title={
            <>
              Your personal{' '}
              <span className="italic" style={{ color: 'var(--melo-blush)' }}>
                sanctuary
              </span>
            </>
          }
          subtitle="Private tools for reflection and daily growth — only visible to you."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MY_SPACE_FEATURES.map((item) => (
            <MySpaceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
