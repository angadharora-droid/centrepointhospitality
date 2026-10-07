import { permanentRedirect } from "next/navigation";
import { site } from "@/content/site";

export default function CareersPage() {
  permanentRedirect(site.careersUrl);
}
