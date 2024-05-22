import { title } from "@/components/primitives";
import ImageUploadForm from "@/components/ImageUploadForm";
import UploadFilesComonent from "@/components/uploadFiles.component";

export default function DocsPage() {
  return (
    <div className="">
      <h2 className={title({ size: "md" })}>Compiling screen to <span className="text-secondary">PDF</span></h2>
      {/* <ImageUploadForm /> */}
      <UploadFilesComonent />
    </div>
  );
}