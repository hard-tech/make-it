import { title } from "@/components/primitives";
import ImageUploadForm from "@/components/ImageUploadForm";
import UploadFilesComonent from "@/components/uploadFiles.component";

export default function DocsPage() {
  return (
    <div>
      <h2 className={title({ size: "sm" })}>My Compiling screen to <span className="text-violet-700">PDF</span></h2>
      <ImageUploadForm />
      <UploadFilesComonent />
    </div>
  );
}