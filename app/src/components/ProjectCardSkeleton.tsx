/**
 * Projects loading placeholder.
 *
 * Every block below mirrors the measured anatomy of a loaded project card
 * (see scripts/measure-skeletons.mjs / skeleton-audit.json):
 *   padding 24px · badge 26.5px +16 · title 24px +12 · description 58.5px +16
 *   tags 20.5px +16 · footer 19.5px   →  ~257px card height at 1440/768/390px.
 * Keeping the same rhythm means loading → loaded does not resize the card row.
 */
const Bar = ({ className }: { className: string }) => (
  <div className={`skeleton-bar ${className}`} />
);

export const ProjectCardSkeleton = () => (
  <div
    data-project-skeleton=""
    className="liquid-glass rounded-2xl p-6"
    aria-hidden="true"
  >
    {/* Domain badge */}
    <div className="mb-4">
      <Bar className="h-[26.5px] w-[104px] rounded-full" />
    </div>

    {/* Title */}
    <Bar className="mb-3 h-[24px] w-[78%]" />

    {/* Description — three lines, matching the 58.5px real description box */}
    <div className="mb-4 flex h-[58.5px] flex-col justify-between">
      <Bar className="h-[13px] w-full" />
      <Bar className="h-[13px] w-full" />
      <Bar className="h-[13px] w-[58%]" />
    </div>

    {/* Technology chips */}
    <div className="mb-4 flex h-[20.5px] flex-wrap gap-2 overflow-hidden">
      <Bar className="h-[20.5px] w-[54px] rounded" />
      <Bar className="h-[20.5px] w-[68px] rounded" />
      <Bar className="h-[20.5px] w-[46px] rounded" />
    </div>

    {/* Links + details affordance */}
    <div className="flex h-[19.5px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Bar className="h-[18px] w-[18px] rounded-full" />
        <Bar className="h-[18px] w-[18px] rounded-full" />
      </div>
      <Bar className="h-[14px] w-[62px]" />
    </div>
  </div>
);

export default ProjectCardSkeleton;
