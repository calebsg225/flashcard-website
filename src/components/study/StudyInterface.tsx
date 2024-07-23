import { sampleSets } from "../../data/sample_sets";

interface StudyInterfaceProps {
  set: string;
}

export const StudyInterface = ({set}: StudyInterfaceProps) => {
  return (
    <section className="study-interface-container"></section>
  );
}