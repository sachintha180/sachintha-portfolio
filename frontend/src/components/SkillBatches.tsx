import { allSkills } from "../lib/skills";

type SkillBatchesProps = {
  batchesRef?: React.Ref<HTMLDivElement>;
};

export default function SkillBatches({ batchesRef }: SkillBatchesProps) {
  return (
    <div ref={batchesRef} className="flex gap-4">
      {/* Skill Batch */}
      {Object.entries(allSkills).map(([title, skillEntry], batchIndex) => (
        <table key={`${batchIndex}`}>
          {/* Skill Logos */}
          <tbody>
            <tr>
              {skillEntry.skills.map((skill, index) => (
                <td
                  key={`${batchIndex}${index}`}
                  className={[
                    "pb-2 text-center",
                    // Remove min-w for first and last
                    index !== 0 &&
                      index !== skillEntry.skills.length - 1 &&
                      "min-w-[100px]",
                    // Right padding for first
                    index === 0 && "pr-4 pl-2",
                    // Left padding for last
                    index === skillEntry.skills.length - 1 && "pr-2 pl-4",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="mx-auto w-fit">
                    {typeof skill.icon === "string" ? (
                      <p
                        className="h-[30px] w-[30px] text-3xl font-bold"
                        style={{ color: skillEntry.color }}
                      >
                        {skill.icon}
                      </p>
                    ) : (
                      <skill.icon size={30} color={skillEntry.color} />
                    )}
                  </div>
                  <span className="text-sm" style={{ color: skillEntry.color }}>
                    {skill.name}
                  </span>
                </td>
              ))}
            </tr>

            {/* Skill Title */}
            <tr
              style={{
                backgroundColor: skillEntry.color,
              }}
            >
              <td
                colSpan={skillEntry.skills.length}
                className="p-1 text-center text-sm text-white uppercase"
              >
                {title}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}
