import AuditDetails from "@/components/audits/AuditDetails";
import { getAuditById } from "@/data/dummyData";

export default function AuditDetailsPage({ params }) {
  const audit = getAuditById(params.id);
  return <AuditDetails audit={audit} />;
}
