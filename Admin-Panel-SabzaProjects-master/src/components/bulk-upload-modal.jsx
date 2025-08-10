import React, { useState, useRef } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function BulkUploadModal({ open, onOpenChange, onUploadComplete }) {
  const [uploadStep, setUploadStep] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const extension = file.name.split(".").pop().toLowerCase();
      if (["csv", "xlsx", "json"].includes(extension)) {
        setFileType(extension);
      } else {
        setFileType(null);
      }
    }
  };

  const startUpload = async () => {
    if (!selectedFile) return;
    setUploadStep("processing");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("confirm", "true"); // Set confirm to true for actual upload

    try {
      const response = await axios.post("http://localhost:5000/api/projects/uploadcsv", formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          setUploadProgress(percent);
        },
      });

      if (response.status === 200) {
        setUploadStep("complete");
        onUploadComplete(); // Call the callback to refresh projects
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStep("upload");
      alert("Upload failed. Please try again.");
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setFileType(null);
    setUploadProgress(0);
    setUploadStep("upload");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Upload</DialogTitle>
          <DialogDescription>Upload CSV, XLSX, or JSON files.</DialogDescription>
        </DialogHeader>

        {uploadStep === "upload" && (
          <Card>
            <CardHeader>
              <CardTitle>Select a File</CardTitle>
              <CardDescription>Choose a file to upload.</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                onClick={() => fileInputRef.current.click()}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Choose File
              </Button>

              {selectedFile && (
                <div className="mt-2">
                  <Badge>{fileType ? fileType.toUpperCase() : "Invalid File"}</Badge>
                  <p>{selectedFile.name}</p>
                  {fileType && (
                    <Button className="mt-2" onClick={startUpload}>
                      Start Upload
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {uploadStep === "processing" && (
          <div className="text-center">
            <Progress value={uploadProgress} className="w-full" />
            <p className="mt-2">Uploading... {uploadProgress}%</p>
          </div>
        )}

        {uploadStep === "complete" && (
          <div className="text-center">
            <p className="mb-2">Upload Complete!</p>
            <Button onClick={resetUpload}>Upload Another</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
