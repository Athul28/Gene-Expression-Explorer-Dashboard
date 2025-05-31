
import React from "react";
import { Button } from "@/components/ui/button"; // If using shadcn/ui
import { Download } from "lucide-react";

type DownloadTextButtonProps = {
    filename: string;
    text: string;
};

const DownloadTextButton: React.FC<DownloadTextButtonProps> = ({ filename, text }) => {
    const handleDownload = () => {
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    return <Button variant="outline" size="sm" className="flex-1" onClick={handleDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download
    </Button>
};

export default DownloadTextButton;